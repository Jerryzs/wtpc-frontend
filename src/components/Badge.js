function Badge ({ text, color, bgColor, varient }) {
  return (
    <span
      className={`badge ${varient ? `badge-${varient}` : ''}`.trim()}
      style={{
        color: color ?? '#ffffff',
        backgroundColor: bgColor,
        whiteSpace: 'normal',
        textAlign: 'left'
      }}
    >
      {text ?? '???'}
    </span>
  );
}

export default Badge;
