import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import { sanityClient } from '../../../sanity';
import { API_URL } from '../../configs/api';
import { footerConfig } from '../../configs/footer';
import NavLogo from '../Header/NavLogo';
import styles from './Footer.module.scss';

function Footer({ navConfig }) {
  const [contact, setcontact] = useState({
    phone: '600 - 383 - 727',
    email: 'michalbodziony@oyama-karate.eu'
  });

  useEffect(async () => {
    const contactData = await sanityClient.fetch(
      `
      *[_type == "contactData"][0] {
        phone,
        email
      }
    `
    );
    setcontact(contactData);
  }, []);

  if (!navConfig) {
    return <></>;
  }

  const { logo } = footerConfig;

  return (
    <footer className={styles.footer}>
      <section>
        <div className={styles.pageInfo}>
          <NavLogo logo={logo.src} />
          <div className={styles.footerInfo}>
            <p>Michał Bodziony</p>
            <p>tel. {contact.phone}</p>
            <p>e-mail: {contact.email}</p>
          </div>
        </div>
        <div className={styles.pageMap}>
          <h4>MAPA STRONY</h4>
          <div className={styles.pageMapItems}>
            {navConfig.items.map((item) => (
              <Link
                key={`footer-${item.title.split(' ').join()}`}
                href={item.to}
              >
                <a>
                  <p>{item.title}</p>
                </a>
              </Link>
            ))}
          </div>
          <div className={styles.pageMapItems}>
            {navConfig.items.map(
              (item) =>
                item.subItems &&
                item.subItems.map((sItem) => (
                  <Link
                    key={`footer-${sItem.title.split(' ').join()}`}
                    href={sItem.to}
                  >
                    <a>
                      <p>{sItem.title}</p>
                    </a>
                  </Link>
                ))
            )}
          </div>
        </div>
      </section>

      <hr />

      <div className={styles.formalInfo}>
        <a href='https://gancle-studio.pl' rel='noreferrer' target='_blank'>
          <p className={styles.creatorAd}>
            This website was created by <span>Gancle Studio</span>{' '}
          </p>
        </a>
        <p className={styles.copyright}>
          <small>&copy;</small> Copyright {new Date().getFullYear()},
          oyama-karate.eu. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
