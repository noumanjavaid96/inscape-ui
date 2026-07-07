import { useState } from 'react';
import tokens from '../../design/tokens';

const { colors, radius, font } = tokens;

/**
 * Dark text input with label, optional hint and error states.
 * Uncontrolled-friendly: pass `value` + `onChange` to control it.
 */
export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  hint,
  error,
  style,
  inputStyle,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error
    ? colors.danger
    : focused
      ? 'rgba(238,140,70,0.5)'
      : 'rgba(255,255,255,0.1)';

  return (
    <div style={{ marginBottom: 16, ...style }}>
      {label && (
        <label style={{ display: 'block', marginBottom: 7, font: `500 13px ${font.family}`, color: colors.textMuted }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          height: 50,
          borderRadius: radius.md,
          background: colors.bg3,
          border: `1px solid ${borderColor}`,
          color: colors.text,
          font: `400 15px ${font.family}`,
          padding: '0 16px',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s ease',
          ...inputStyle,
        }}
        {...rest}
      />
      {error ? (
        <div style={{ marginTop: 6, font: `400 12px ${font.family}`, color: colors.danger }}>{error}</div>
      ) : hint ? (
        <div style={{ marginTop: 6, font: `400 12px ${font.family}`, color: colors.textFaint }}>{hint}</div>
      ) : null}
    </div>
  );
}
