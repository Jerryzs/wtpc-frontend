import Link from 'next/link';

import styles from '../scss/components/Footer.module.scss';

function Footer () {
  return (
    <div
      className={`${styles.wrapper} container`}
    >
      <div
        className={styles.copyright}
      >
        Copyright &copy; 2020 WT Programming Club.
        <br />
        All rights reserved.
      </div>
      <div
        className={styles.bottomLinks}
      >
        <Link
          href='#'
        >
          <a>
            Terms of Use
          </a>
        </Link>

        <span
          children='|'
        />

        <Link
          href='#'
        >
          <a>
            Privacy Policy
          </a>
        </Link>

        <span
          children='|'
        />

        <a
          href='https://github.com/WinchesterThurstonSchool/'
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default Footer;
