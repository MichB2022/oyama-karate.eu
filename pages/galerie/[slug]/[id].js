import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Gallery from 'react-grid-gallery';
import slugify from 'slugify';
import ArticleListContainer from '../../../src/components/shared/ArticleListContainer/ArticleListContainer';
import Button from '../../../src/components/shared/Button/Button';
import NotFound from '../../../src/components/shared/NotFound/notFound';
import { API_UPLOADS_URL, API_URL } from '../../../src/configs/api';
import { getNavConfig } from '../../../src/configs/nav';
import styles from './index.module.scss';

const Galery = ({ galery, pageDescription }) => {
  if (!galery || galery === undefined || galery === {}) {
    <NotFound />;
  }

  const router = useRouter();

  const images = galery
    ? galery.images.map((el) => {
        return {
          src: `${API_UPLOADS_URL}/galeryimages/${el.url}`,
          thumbnail: `${API_UPLOADS_URL}/galeryimages/${el.url}`,
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
          oraz Gliwice - Oyama-karate.eu - Galeria - oyama-karate.eu
        </title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Galeria - oyama-karate.eu`}
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
                <h1>{galery.name}</h1>
                <Button
                  text='Powrót do galerii'
                  onClick={() => {
                    router.push('/galerie');
                  }}
                />
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

export async function getStaticPaths() {
  const data = await axios.get(`${API_URL}/galery`);
  const params = [];
  data.data.data.forEach((el) => {
    params.push({
      params: {
        id: el.id,
        slug: slugify(el.name, { lower: true })
      }
    });
  });

  return {
    paths: params,
    fallback: true // false or 'blocking'
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const data = await axios.get(`${API_URL}/galery/${params.id}`);
  const navConfig = await getNavConfig();
  let pageDescription = data.data.data.pageDescription;

  if (
    !data.data.data.pageDescription ||
    data.data.data.pageDescription === ''
  ) {
    const pageDesc = await axios.get(`${API_URL}/homepage/description`);
    pageDescription = pageDesc.data.data.defaultPageDescription;
  }

  return {
    props: { galery: data.data.data || {}, navConfig, pageDescription },
    revalidate: 3600
  };
}

export default Galery;
