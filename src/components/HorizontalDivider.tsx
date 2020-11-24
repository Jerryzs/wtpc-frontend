import styles from '../scss/components/HorizontalDivider.module.scss'

function HorizontalDivider ({
  className,
  text,
  ...props
}: {
  className: string
  text: string
  [prop: string]: any
}): JSX.Element {
  return (
    <div
      className={`${styles.wrapper} badge badge-secondary ${className}`.trim()}
      {...props}
    >
      <span>
        {text}
      </span>
    </div>
  )
}

export default HorizontalDivider
