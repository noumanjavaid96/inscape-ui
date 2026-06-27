import tokens from '../../design/tokens';

const { colors, font } = tokens;

/** Titled content section with an optional right-aligned action node. */
export default function Section({ title, action, children, style, titleStyle }) {
  return (
    <section style={style}>
      {(title || action) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          {title && <h2 style={{ font: `600 18px ${font.family}`, color: colors.text, margin: 0, ...titleStyle }}>{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
