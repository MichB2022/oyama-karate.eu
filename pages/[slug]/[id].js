import axios from 'axios';
import slugify from 'slugify';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import Loader from '../../src/components/shared/Loader/Loader';
import { API_URL } from '../../src/configs/api';
import styles from './index.module.scss';

const InfoPage = ({ page }) => {
  if (!page) {
    return <Loader />;
  }
  return (
    <article className={styles.infoPage}>
      <section className={styles.mainContent}>
        <div className={styles.infoGeneral}>
          <div className={styles.container}>
            <h1>{page.title}</h1>
            <div
              className={`${styles.text} ql-editor`}
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
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
  const data = await axios.get(`${API_URL}/infopages`);
  const params = [];
  data.data.data.forEach((el) => {
    params.push({
      params: {
        slug: slugify(el.title, { lower: true }),
        id: el.id
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
  const data = await axios.get(`${API_URL}/infopages/${params.id}`);

  return {
    props: { page: data.data.data || {}, instructorId: params.id },
    revalidate: 3600
  };
}

export default InfoPage;
