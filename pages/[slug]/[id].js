import Head from 'next/head';
import { sanityClient } from '../../sanity';
import ArticleBody from '../../src/components/ArticleBody/ArticleBody';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import Loader from '../../src/components/shared/Loader/Loader';
import { getNavConfig } from '../../src/configs/nav';
import styles from './index.module.scss';

const InfoPage = ({ page }) => {
  if (!page) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{page.title}</title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Informacje - ${page.title} - oyama-karate.eu`}
          key='ogtitle'
        />
        <meta key='robots' name='robots' content='index,follow' />
        <meta key='googlebot' name='googlebot' content='index,follow' />
        <meta name='description' content={page.seoDesc} />
        <meta property='og:description' content={page.seoDesc} key='ogdesc' />
      </Head>

      <article className={styles.infoPage}>
        <section className={styles.mainContent}>
          <div className={styles.infoGeneral}>
            <div className={styles.container}>
              <h1>{page.title}</h1>
              <div className={styles.text}>
                <ArticleBody body={page.content} />
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

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(`
    *[_type == "infoPages"][] {
      _id,
      slug
    }
  `);

  return {
    paths: paths.map((el) => ({
      params: {
        slug: el.slug.current,
        id: el._id
      }
    })),
    fallback: true
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const { slug = '', id = '' } = params;

  const navConfig = await getNavConfig();

  const infoPage = await sanityClient.fetch(
    `
    *[_type == "infoPages" && slug.current == $slug && _id == $id][0] {
      _id,
      title,
      seoDesc,
      seoKeyWords,
      content
    }
  `,
    { slug, id }
  );

  return {
    props: {
      page: infoPage || {},
      navConfig
    },
    revalidate: 3600
  };
}

export default InfoPage;
