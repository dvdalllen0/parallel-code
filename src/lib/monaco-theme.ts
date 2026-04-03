import * as monaco from 'monaco-editor';
import type { LookPreset } from './look';

interface PresetColors {
  base: 'vs-dark' | 'vs';
  bgElevated: string;
  fg: string;
  fgMuted: string;
  fgSubtle: string;
  border: string;
  accent: string;
}

// Colors are generally derived from the CSS variables in src/styles.css for each look preset,
// but may intentionally diverge (e.g. midnight uses #000 editor background for OLED).
// Diff highlight colors use the GitHub Dark palette (shared across all presets).
const graphiteColors: PresetColors = {
  base: 'vs-dark',
  bgElevated: '#1c2630',
  fg: '#d7e4f0',
  fgMuted: '#9bb0c3',
  fgSubtle: '#678197',
  border: '#2e3e50',
  accent: '#2ec8ff',
};

const presetColors: Record<LookPreset, PresetColors> = {
  classic: {
    base: 'vs-dark',
    bgElevated: '#2d2e32',
    fg: '#cccdd2',
    fgMuted: '#8b8d93',
    fgSubtle: '#6d7076',
    border: '#393b3f',
    accent: '#4c6fff',
  },
  graphite: graphiteColors,
  midnight: {
    ...graphiteColors,
    bgElevated: '#000000',
  },
  indigo: {
    base: 'vs-dark',
    bgElevated: '#1c2038',
    fg: '#deddff',
    fgMuted: '#b1b2de',
    fgSubtle: '#8286b6',
    border: '#384270',
    accent: '#7a78ff',
  },
  ember: {
    base: 'vs-dark',
    bgElevated: '#211918',
    fg: '#f2ddd1',
    fgMuted: '#d5ab94',
    fgSubtle: '#9f7561',
    border: '#4e3831',
    accent: '#ff944d',
  },
  glacier: {
    base: 'vs-dark',
    bgElevated: '#232e3a',
    fg: '#e5eff5',
    fgMuted: '#bed2dc',
    fgSubtle: '#92aebb',
    border: '#3b5363',
    accent: '#50e2d3',
  },
  minimal: {
    base: 'vs-dark',
    bgElevated: '#161514',
    fg: '#e8e8e8',
    fgMuted: '#b8b8b8',
    fgSubtle: '#909090',
    border: '#2a2a2a',
    accent: '#c8bfa0',
  },
  zenburnesque: {
    base: 'vs-dark',
    bgElevated: '#2e2d2a',
    fg: '#dcdccc',
    fgMuted: '#a0a090',
    fgSubtle: '#7f8f7f',
    border: '#484640',
    accent: '#cc9393',
  },
  paper: {
    base: 'vs',
    bgElevated: '#ffffff',
    fg: '#18212b',
    fgMuted: '#4f6277',
    fgSubtle: '#6f8092',
    border: '#cfd8e3',
    accent: '#2563eb',
  },
};

function buildThemeData(c: PresetColors): monaco.editor.IStandaloneThemeData {
  const isLight = c.base === 'vs';
  return {
    base: c.base,
    inherit: true,
    rules: [
      { token: 'comment', foreground: c.fgSubtle.slice(1) },
      { token: 'keyword', foreground: c.accent.slice(1) },
    ],
    colors: {
      'editor.background': c.bgElevated,
      'editor.foreground': c.fg,
      'editor.lineHighlightBackground': isLight ? '#00000008' : '#ffffff06',
      'editorLineNumber.foreground': c.fgSubtle,
      'editorLineNumber.activeForeground': c.fgMuted,
      'editor.selectionBackground': c.accent + (isLight ? '22' : '33'),
      'editorWidget.background': c.bgElevated,
      'editorWidget.border': c.border,
      'diffEditor.insertedLineBackground': isLight ? '#2da44e14' : '#2ea04315',
      'diffEditor.removedLineBackground': isLight ? '#cf222e14' : '#f8514915',
      'diffEditor.insertedTextBackground': isLight ? '#2da44e30' : '#2ea04340',
      'diffEditor.removedTextBackground': isLight ? '#cf222e30' : '#f8514940',
      'diffEditorGutter.insertedLineBackground': isLight ? '#2da44e22' : '#2ea04326',
      'diffEditorGutter.removedLineBackground': isLight ? '#cf222e22' : '#f8514926',
      'diffEditor.unchangedRegionBackground': c.border,
      'diffEditor.unchangedRegionForeground': c.fgMuted,
      'diffEditor.unchangedRegionShadow': '#00000000',
      'scrollbarSlider.background': c.fgSubtle + '40',
      'scrollbarSlider.hoverBackground': c.fgSubtle + '60',
    },
  };
}

export function monacoThemeName(preset: LookPreset): string {
  return `parallel-${preset}`;
}

export function registerMonacoThemes(): void {
  for (const [preset, colors] of Object.entries(presetColors)) {
    monaco.editor.defineTheme(monacoThemeName(preset as LookPreset), buildThemeData(colors));
  }
}
