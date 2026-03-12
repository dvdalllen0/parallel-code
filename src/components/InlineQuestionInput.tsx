import { createSignal, onMount } from 'solid-js';
import { theme } from '../lib/theme';
import { sf } from '../lib/fontScale';

interface InlineQuestionInputProps {
  onSubmit: (question: string) => void;
  onDismiss: () => void;
}

export function InlineQuestionInput(props: InlineQuestionInputProps) {
  const [question, setQuestion] = createSignal('');
  let inputRef: HTMLInputElement | undefined;

  onMount(() => {
    // Delay focus so it doesn't interfere with the mouseup that triggered it
    requestAnimationFrame(() => inputRef?.focus());
  });

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const q = question().trim();
      if (q) props.onSubmit(q);
    }
    if (e.key === 'Escape') {
      props.onDismiss();
    }
  }

  return (
    <div
      onMouseUp={(e) => e.stopPropagation()}
      style={{
        margin: '4px 40px 4px 80px',
        display: 'flex',
        gap: '4px',
        padding: '4px',
        background: theme.bgElevated,
        border: `1px solid ${theme.border}`,
        'border-left': `3px solid ${theme.accent}`,
        'border-radius': '4px',
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Ask about this code..."
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
        }}
      />
      <button
        onClick={() => {
          const q = question().trim();
          if (q) props.onSubmit(q);
        }}
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
  );
}
