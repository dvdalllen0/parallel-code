import { theme } from '../lib/theme';
import { sf } from '../lib/fontScale';
import type { ReviewAnnotation } from './review-types';

interface ReviewCommentCardProps {
  annotation: ReviewAnnotation;
  onDismiss: () => void;
  /** Use a semi-transparent, brighter style (for overlaying plan content). */
  overlay?: boolean;
}

export function ReviewCommentCard(props: ReviewCommentCardProps) {
  const locationLabel = () => {
    // Plan annotations store "file § Section" in filePath — show section name
    const sectionIdx = props.annotation.filePath.indexOf('\u00A7');
    if (sectionIdx !== -1) {
      return props.annotation.filePath.slice(sectionIdx + 1).trim();
    }
    return props.annotation.startLine === props.annotation.endLine
      ? `line ${props.annotation.startLine}`
      : `lines ${props.annotation.startLine}\u2013${props.annotation.endLine}`;
  };

  return (
    <div
      style={{
        margin: '4px 40px 4px 80px',
        'max-width': '560px',
        'border-left': `3px solid ${theme.warning}`,
        'border-radius': '0 4px 4px 0',
        background: props.overlay
          ? `color-mix(in srgb, ${theme.bgElevated} 88%, ${theme.warning} 12%)`
          : theme.bgElevated,
        'backdrop-filter': props.overlay ? 'blur(8px)' : undefined,
        padding: '8px 12px',
        'font-family': "'JetBrains Mono', monospace",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'space-between',
        }}
      >
        <span
          style={{
            'font-size': sf(11),
            color: props.overlay ? theme.fg : theme.warning,
          }}
        >
          Review &middot; {locationLabel()}
        </span>
        <button
          onClick={() => props.onDismiss()}
          style={{
            background: 'transparent',
            border: 'none',
            color: theme.fgMuted,
            cursor: 'pointer',
            padding: '2px 4px',
            'border-radius': '3px',
            'font-size': sf(14),
            'line-height': '1',
          }}
          title="Dismiss"
        >
          &times;
        </button>
      </div>

      {/* Comment text */}
      <div
        style={{
          color: theme.fg,
          'white-space': 'pre-wrap',
          'font-size': sf(12),
          'margin-top': '4px',
        }}
      >
        {props.annotation.comment}
      </div>
    </div>
  );
}
