function Badge ({
  text,
  color,
  bgColor,
  varient
}: {
  text: string,
  color?: string | null,
  bgColor?: string | null,
  varient?: string | null
}): JSX.Element {
  return (
    <span
      className={`badge ${varient ? `badge-${varient}` : ''}`.trim()}
      style={{
        color: color ?? '#ffffff',
        backgroundColor: bgColor ?? '#6c757d',
        whiteSpace: 'normal',
        textAlign: 'left'
      }}
    >
      {text ?? '???'}
    </span>
  );
}

export default Badge;
