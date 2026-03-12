import { createSignal, onMount, onCleanup, Show } from 'solid-js';
import { theme } from '../lib/theme';
import { sf } from '../lib/fontScale';

interface DiffSelectionPopoverProps {
  x: number;
  y: number;
  onAsk: (question: string) => void;
  onDismiss: () => void;
}

export function DiffSelectionPopover(props: DiffSelectionPopoverProps) {
  const [question, setQuestion] = createSignal('');
  const [showInput, setShowInput] = createSignal(false);
  let inputRef: HTMLInputElement | undefined;
  let popoverRef: HTMLDivElement | undefined;

  function handleSubmit() {
    const q = question().trim();
    if (!q) return;
    props.onAsk(q);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      props.onDismiss();
    }
  }

  // Dismiss when clicking outside
  onMount(() => {
    let registered = false;
    const handler = (e: MouseEvent) => {
      if (popoverRef && !popoverRef.contains(e.target as Node)) {
        props.onDismiss();
      }
    };
    // Delay to avoid catching the mouseup that triggered the popover
    const timerId = setTimeout(() => {
      registered = true;
      document.addEventListener('mousedown', handler);
    }, 0);
    onCleanup(() => {
      clearTimeout(timerId);
      if (registered) document.removeEventListener('mousedown', handler);
    });
  });

  return (
    <div
      ref={popoverRef}
      onMouseUp={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        left: `${props.x}px`,
        top: `${props.y}px`,
        'z-index': '100',
        background: theme.bgElevated,
        border: `1px solid ${theme.border}`,
        'border-radius': '6px',
        'box-shadow': '0 4px 12px rgba(0,0,0,0.4)',
        padding: '4px',
        display: 'flex',
        'flex-direction': 'column',
        gap: '4px',
        'min-width': '200px',
      }}
    >
      <Show
        when={showInput()}
        fallback={
          <button
            onClick={() => {
              setShowInput(true);
              requestAnimationFrame(() => inputRef?.focus());
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.fg,
              cursor: 'pointer',
              padding: '6px 10px',
              'border-radius': '4px',
              'font-size': sf(12),
              'text-align': 'left',
              'font-family': "'JetBrains Mono', monospace",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = theme.bgHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            Ask about this code...
          </button>
        }
      >
        <div style={{ display: 'flex', gap: '4px', padding: '2px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask a question..."
            value={question()}
            onInput={(e) => setQuestion(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: '1',
              background: theme.bgInput,
              border: `1px solid ${theme.borderSubtle}`,
              'border-radius': '4px',
              color: theme.fg,
              'font-size': sf(12),
              'font-family': "'JetBrains Mono', monospace",
              padding: '4px 8px',
              outline: 'none',
              'min-width': '250px',
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!question().trim()}
            style={{
              background: theme.accent,
              border: 'none',
              color: theme.accentText,
              cursor: question().trim() ? 'pointer' : 'default',
              padding: '4px 10px',
              'border-radius': '4px',
              'font-size': sf(12),
              'font-weight': '600',
              opacity: question().trim() ? '1' : '0.5',
            }}
          >
            Ask
          </button>
        </div>
      </Show>
    </div>
  );
}
