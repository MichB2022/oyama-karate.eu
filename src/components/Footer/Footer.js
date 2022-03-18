import Link from 'next/link';
import { useEffect, useState } from 'react';
import { footerConfig } from '../../configs/footer';
import { getNavConfig } from '../../configs/nav';
import NavLogo from '../Header/NavLogo';
import styles from './Footer.module.scss';

function Footer() {
  const [navConfig, setNavConfig] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(async () => {
    setNavConfig(await getNavConfig());
    setLoader(false);
  }, []);

  if (loader) {
    return null;
  }

  const { logo } = footerConfig;

  return (
    <footer className={styles.footer}>
      <section>
        <div className={styles.pageInfo}>
          <NavLogo logo={logo.src} />
          <div className={styles.footerInfo}>
            <p>Michał Bodziony</p>
            <p>tel. 600 383 727</p>
            <p>e-mail: michalbodziony@oyama-karate.eu</p>
          </div>
        </div>
        <div className={styles.pageMap}>
          <h4>MAPA STRONY</h4>
          <div className={styles.pageMapItems}>
            {navConfig.items.map((item) => (
              <>
                <Link href={item.to}>
                  <a>
                    <p
                      key={`footer-${item.title.split(' ').join}`}
                    >{`* ${item.title}`}</p>
                  </a>
                </Link>
              </>
            ))}
          </div>
          <div className={styles.pageMapItems}>
            {navConfig.items.map((item) => (
              <>
                {item.subItems &&
                  item.subItems.map((sItem) => (
                    <Link href={sItem.to}>
                      <a>
                        <p key={`footer-${sItem.title.split(' ').join}`}>
                          {`* ${sItem.title}`}
                        </p>
                      </a>
                    </Link>
                  ))}
              </>
            ))}
          </div>
        </div>
      </section>

      <hr />

      <div className={styles.formalInfo}>
        <p className={styles.creatorAd}>
          This website was created in collaboration with{' '}
          <span>Gancle Studio</span>{' '}
        </p>
        <p className={styles.copyright}>
          <small>&copy;</small> Copyright {new Date().getFullYear()},
          oyama-karate.eu. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
