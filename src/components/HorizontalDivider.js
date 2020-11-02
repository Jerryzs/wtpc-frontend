import styles from '../scss/components/HorizontalDivider.module.scss';

function HorizontalDivider ({ className, text, ...props }) {
  return (
    <div
      className={`${styles.wrapper} badge badge-secondary ${className}`.trim()}
      {...props}
    >
      <span>
        {text}
      </span>
    </div>
  );
}

export default HorizontalDivider;
