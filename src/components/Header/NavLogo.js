import Link from 'next/link';
import styles from './NavLogo.module.scss';

const NavLogo = ({ logo }) => {
  const { src } = logo;
  return (
    <Link href='/'>
      <a className={styles.logo}>
        <img src={src} alt='logo' />
        <div>
          {' '}
          <>
            <span className={styles.specialText}>oyama-</span>karate
            <span className={styles.specialText}>.</span>eu
          </>
        </div>
      </a>
    </Link>
  );
};

export default NavLogo;
