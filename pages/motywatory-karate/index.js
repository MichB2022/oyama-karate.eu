import axios from 'axios';
import Head from 'next/head';
import Gallery from 'react-grid-gallery';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import NotFound from '../../src/components/shared/NotFound/notFound';
import { API_UPLOADS_URL, API_URL } from '../../src/configs/api';
import { getNavConfig } from '../../src/configs/nav';
import styles from './index.module.scss';

const Galery = ({ galery, pageDescription }) => {
  if (!galery || galery === undefined || galery === {}) {
    <NotFound />;
  }
  const images = galery
    ? galery.map((el) => {
        return {
          src: `${API_UPLOADS_URL}/motivation/${el.url}`,
          thumbnail: `${API_UPLOADS_URL}/motivation/${el.url}`,
          thumbnailWidth: 200,
          thumbnailHeight: 153
        };
      })
    : [];

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>
          Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Motywatory - oyama-karate.eu
        </title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Motywatory - oyama-karate.eu`}
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
      {galery && (
        <article className={styles.infoPage}>
          <section className={styles.mainContent}>
            <div className={styles.galeriesPage}>
              <div className={styles.container}>
                <h1>Twoja dzisiejsza motywacja</h1>
                <div className={styles.imagesContainer}>
                  <Gallery images={images} enableImageSelection={false} />
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
      )}
    </>
  );
};

// This also gets called at build time
export async function getStaticProps({ params }) {
  const data = await axios.get(`${API_URL}/motivation`);
  const navConfig = await getNavConfig();
  const pageDesc = await axios.get(`${API_URL}/homepage/description`);
  const pageDescription = pageDesc.data.data.defaultPageDescription;

  return {
    props: { galery: data.data.data || {}, navConfig, pageDescription },
    revalidate: 3600
  };
}

export default Galery;
