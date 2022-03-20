import axios from 'axios';
import Gallery from 'react-grid-gallery';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import NotFound from '../../src/components/shared/NotFound/notFound';
import { API_UPLOADS_URL, API_URL } from '../../src/configs/api';
import styles from './index.module.scss';

const Galery = ({ galery }) => {
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

  return {
    props: { galery: data.data.data || {} },
    revalidate: 3600
  };
}

export default Galery;
