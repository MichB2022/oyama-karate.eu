import axios from 'axios';
import Head from 'next/head';
import slugify from 'slugify';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import Loader from '../../src/components/shared/Loader/Loader';
import { API_URL } from '../../src/configs/api';
import { getNavConfig } from '../../src/configs/nav';
import styles from './index.module.scss';

const InfoPage = ({ page, pageDescription }) => {
  if (!page) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>
          Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Informacje - {page.title} -
          oyama-karate.eu
        </title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Informacje - ${page.title} - oyama-karate.eu`}
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
    </>
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
    props: {
      page: data.data.data || {},
      instructorId: params.id,
      navConfig,
      pageDescription
    },
    revalidate: 3600
  };
}

export default InfoPage;
