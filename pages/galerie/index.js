import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import slugify from 'slugify';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import { API_UPLOADS_URL, API_URL } from '../../src/configs/api';
import { getNavConfig } from '../../src/configs/nav';
import styles from './index.module.scss';

const Galeries = ({ galeries, pageDescription }) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>
          Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Galerie - oyama-karate.eu
        </title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Galerie - oyama-karate.eu`}
          key='ogtitle'
        />
        <meta key='robots' name='robots' content='index,follow' />
        <meta key='googlebot' name='googlebot' content='index,follow' />
        <meta name='description' content={pageDescription} />
        <meta
          property='og:description'
          content={pageDescription}
          key='ogdesc'
        />
      </Head>
      <article className={styles.infoPage}>
        <section className={styles.mainContent}>
          <div className={styles.galeriesPage}>
            <div className={styles.container}>
              <h1>Nasze Galerie</h1>
              <div className={styles.galeriesContainer}>
                {galeries.map((el) => (
                  <article className={styles.articleItemContainer}>
                    <Link
                      href={`/galerie/${slugify(el.name, { lower: true })}/${
                        el.id
                      }`}
                    >
                      <a>
                        <img
                          src={`${API_UPLOADS_URL}/galeryimages/${el.imgUrl}`}
                          alt='image'
                          className={styles.articleItemImage}
                        />
                      </a>
                    </Link>
                    <h2 className={styles.articleItemTitle}>
                      <Link
                        href={`/galerie/${slugify(el.name, { lower: true })}/${
                          el.id
                        }`}
                      >
                        {el.name}
                      </Link>
                    </h2>
                    <Link
                      href={`/galerie/${slugify(el.name, { lower: true })}/${
                        el.id
                      }`}
                    >
                      <button
                        type='button'
                        className={styles.articleItemButton}
                      >
                        Czytaj dalej
                      </button>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className={styles.asideContent}>
          <div className={styles.articleListContainer}>
            <ArticleListContainer />
          </div>
        </section>
      </article>
    </>
  );
};

// This also gets called at build time
export async function getStaticProps() {
  const data = await axios.get(`${API_URL}/galery`);
  const navConfig = await getNavConfig();

  return {
    props: { galeries: data.data.data || {}, navConfig },
    revalidate: 3600
  };
}

export default Galeries;
