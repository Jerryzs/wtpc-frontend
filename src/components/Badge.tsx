function Badge ({
  text,
  color,
  bgColor,
  varient
}: {
  text: string
  color?: string | null
  bgColor?: string | null
  varient?: string | null
}): JSX.Element {
  color = color ?? '#ffffff'
  bgColor = bgColor ?? '#6c757d'

  return (
    <span
      className={
        `badge ${varient != null ? `badge-${varient}` : ''}`.trim()
      }
      style={{
        color: color,
        backgroundColor: bgColor,
        whiteSpace: 'normal',
        textAlign: 'left'
      }}
    >
      {text ?? '???'}
    </span>
  )
}

export default Badge
