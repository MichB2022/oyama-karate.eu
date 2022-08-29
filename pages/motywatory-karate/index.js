import urlBuilder from '@sanity/image-url';
import Head from 'next/head';
import Gallery from 'react-grid-gallery';
import { sanityClient } from '../../sanity';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import NotFound from '../../src/components/shared/NotFound/notFound';
import { API_UPLOADS_URL, API_URL } from '../../src/configs/api';
import { getNavConfig } from '../../src/configs/nav';
import styles from './index.module.scss';

const Galery = ({ page, pageDescription }) => {
  if (!page || page === undefined || page === {}) {
    <NotFound />;
  }

  console.log(page);

  const images =
    page && page.images
      ? page.images.map((img) => {
          return {
            src: urlBuilder(sanityClient).image(img).url(),
            thumbnail: urlBuilder(sanityClient).image(img).url(),
            thumbnailWidth: 200,
            thumbnailHeight: 153
          };
        })
      : [];

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Motywatory</title>
        <meta property='og:title' content={`Motywatory`} key='ogtitle' />
        <meta key='robots' name='robots' content='index,follow' />
        <meta key='googlebot' name='googlebot' content='index,follow' />
        <meta name='description' content={page.seoDesc} />
        <meta property='og:description' content={page.seoDesc} key='ogdesc' />
      </Head>
      {page && (
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
  const navConfig = await getNavConfig();

  const page = await sanityClient.fetch(`
    *[_type == "motivators"][0] {
      seoDesc,
      seoKeyWords,
      images
    }
  `);
  return {
    props: { page: page || {}, navConfig },
    revalidate: 3600
  };
}

export default Galery;
