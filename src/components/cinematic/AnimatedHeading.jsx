import tokens from '../../design/tokens';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const { font } = tokens;

/** Split a line into characters, flagging those inside the accent word. */
function toChars(line, accentWord) {
  const out = [];
  line.split(' ').forEach((word, wi, arr) => {
    const isAccent = accentWord && word.replace(/[^A-Za-z]/g, '') === accentWord;
    for (const ch of word) out.push({ ch, accent: isAccent });
    if (wi < arr.length - 1) out.push({ ch: ' ', accent: false });
  });
  return out;
}

/**
 * Character-by-character heading reveal. Each glyph fades and slides in from the
 * left, staggered. An optional accent word renders in serif italic while still
 * animating per character. Gated on `start` so it syncs with the intro lift.
 */
export default function AnimatedHeading({
  lines,
  accentWord,
  accentColor,
  start = false,
  baseDelay = 200,
  charDelay = 30,
  className,
  style,
}) {
  const reduced = useReducedMotion();

  return (
    <h1 className={className} style={{ margin: 0, ...style }}>
      {lines.map((line, lineIndex) => {
        const chars = toChars(line, accentWord);
        return (
          <span key={lineIndex} style={{ display: 'block', whiteSpace: 'nowrap' }}>
            {chars.map((c, charIndex) => {
              const delay = baseDelay + lineIndex * line.length * charDelay + charIndex * charDelay;
              const shown = reduced || start;
              return (
                <span
                  key={charIndex}
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'pre',
                    color: c.accent && accentColor ? accentColor : undefined,
                    fontFamily: c.accent ? font.display : undefined,
                    fontStyle: c.accent ? 'italic' : undefined,
                    fontWeight: c.accent ? 600 : undefined,
                    opacity: shown ? 1 : 0,
                    transform: shown ? 'translateX(0)' : 'translateX(-18px)',
                    transition: reduced ? 'opacity 400ms ease' : 'opacity 500ms ease, transform 500ms ease',
                    transitionDelay: reduced ? '0ms' : `${delay}ms`,
                  }}
                >
                  {c.ch === ' ' ? ' ' : c.ch}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
