import axios from 'axios';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import ArticleListContainer from '../../../src/components/shared/ArticleListContainer/ArticleListContainer';
import Button from '../../../src/components/shared/Button/Button';
import NotFound from '../../../src/components/shared/NotFound/notFound';
import { API_UPLOADS_URL, API_URL } from '../../../src/configs/api';
import styles from './index.module.scss';
import Gallery from 'react-grid-gallery';

const Galery = ({ galery }) => {
  const router = useRouter();

  if (!galery) {
    <NotFound />;
  }

  const images = galery.images.map((el) => {
    return {
      src: `${API_UPLOADS_URL}/galeryimages/${el.url}`,
      thumbnail: `${API_UPLOADS_URL}/galeryimages/${el.url}`,
      thumbnailWidth: 272,
      thumbnailHeight: 153
    };
  });

  return (
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

  return {
    props: { galery: data.data.data || {} },
    revalidate: 3600
  };
}

export default Galery;
