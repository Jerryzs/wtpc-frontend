import Link from './Link';

import styles from '../scss/components/LargeButton.module.scss';

function LargeButton ({ title, description, href }) {
  return (
    <Link
      href={href || '#'}
    >
      <a
        className={`${styles.wrapper} btn btn-lg btn-block border-light text-light`}
      >
        <div
          className={styles.title}
        >
          {title}
        </div>

        <div
          className={styles.description}
        >
          {description}
        </div>
      </a>
    </Link>
  );
}

export default LargeButton;
