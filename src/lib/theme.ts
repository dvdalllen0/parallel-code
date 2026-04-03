import type { LookPreset } from './look';

/** Theme tokens referencing CSS variables defined in styles.css */
export const theme = {
  // Backgrounds (3-tier: black → task columns → panels inside)
  bg: 'var(--bg)',
  bgElevated: 'var(--bg-elevated)',
  bgInput: 'var(--bg-input)',
  bgHover: 'var(--bg-hover)',
  bgSelected: 'var(--bg-selected)',
  bgSelectedSubtle: 'var(--bg-selected-subtle)',

  // Borders
  border: 'var(--border)',
  borderSubtle: 'var(--border-subtle)',
  borderFocus: 'var(--border-focus)',

  // Text
  fg: 'var(--fg)',
  fgMuted: 'var(--fg-muted)',
  fgSubtle: 'var(--fg-subtle)',

  // Accent
  accent: 'var(--accent)',
  accentHover: 'var(--accent-hover)',
  accentText: 'var(--accent-text)',
  link: 'var(--link)',

  // Semantic
  success: 'var(--success)',
  error: 'var(--error)',
  warning: 'var(--warning)',

  // Island containers (task columns, sidebar)
  islandBg: 'var(--island-bg)',
  islandBorder: 'var(--island-border)',
  islandRadius: 'var(--island-radius)',
  taskContainerBg: 'var(--task-container-bg)',
  taskPanelBg: 'var(--task-panel-bg)',
} as const;

type TerminalThemeColors = {
  background: string;
  foreground: string;
  cursor: string;
  selectionBackground: string;
};

/** Opaque terminal colors per preset — aligned with the task panel palette. */
const terminalColors: Record<LookPreset, TerminalThemeColors> = {
  classic: {
    background: '#2d2e32',
    foreground: '#cccdd2',
    cursor: '#4c6fff',
    selectionBackground: '#4c6fff33',
  },
  graphite: {
    background: '#1c2630',
    foreground: '#d7e4f0',
    cursor: '#2ec8ff',
    selectionBackground: '#2ec8ff33',
  },
  midnight: {
    background: '#000000',
    foreground: '#d7e4f0',
    cursor: '#2ec8ff',
    selectionBackground: '#2ec8ff33',
  },
  indigo: {
    background: '#1c2038',
    foreground: '#deddff',
    cursor: '#7a78ff',
    selectionBackground: '#7a78ff33',
  },
  ember: {
    background: '#211918',
    foreground: '#f2ddd1',
    cursor: '#ff944d',
    selectionBackground: '#ff944d33',
  },
  glacier: {
    background: '#232e3a',
    foreground: '#e5eff5',
    cursor: '#50e2d3',
    selectionBackground: '#50e2d333',
  },
  minimal: {
    background: '#262626',
    foreground: '#ececec',
    cursor: '#c8bfa0',
    selectionBackground: '#c8bfa033',
  },
  paper: {
    background: '#fbfcfe',
    foreground: '#18212b',
    cursor: '#2563eb',
    selectionBackground: '#2563eb22',
  },
  zenburnesque: {
    background: '#2e2d2a',
    foreground: '#dcdccc',
    cursor: '#cc9393',
    selectionBackground: '#cc939333',
  },
};

/** Returns an xterm-compatible theme object for the given preset */
export function getTerminalTheme(preset: LookPreset) {
  return terminalColors[preset];
}

/** Generates a styled banner (warning/error/info) using color-mix for background+border. */
export function bannerStyle(color: string): Record<string, string> {
  return {
    color,
    background: `color-mix(in srgb, ${color} 8%, transparent)`,
    padding: '8px 12px',
    'border-radius': '8px',
    border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
  };
}

/** Shared style for uppercase section label headings in dialogs. */
export const sectionLabelStyle: Record<string, string> = {
  'font-size': '11px',
  color: 'var(--fg-muted)',
  'text-transform': 'uppercase',
  'letter-spacing': '0.05em',
};
