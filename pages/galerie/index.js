import urlBuilder from '@sanity/image-url';
import Head from 'next/head';
import Link from 'next/link';
import { sanityClient } from '../../sanity';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import { getNavConfig } from '../../src/configs/nav';
import styles from './index.module.scss';

const Galeries = ({ galeries, pageDescription }) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Galerie</title>
        <meta property='og:title' content={`Galerie`} key='ogtitle' />
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
                    <Link href={`/galerie/${el.slug.current}/${el._id}`}>
                      <a>
                        <img
                          src={urlBuilder(sanityClient)
                            .image(el.mainImage)
                            .url()}
                          alt={el.mainImageAlt}
                          className={styles.articleItemImage}
                        />
                      </a>
                    </Link>
                    <h2 className={styles.articleItemTitle}>
                      <Link href={`/galerie/${el.slug.current}/${el._id}`}>
                        {el.name}
                      </Link>
                    </h2>
                    <Link href={`/galerie/${el.slug.current}/${el._id}`}>
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
  const navConfig = await getNavConfig();

  const homepageData = await sanityClient.fetch(`
  *[_type == "homepage"][0] {
    seoDesc,
    seoKeyWords,
  }
`);

  const pageDescription = homepageData.seoDesc;

  const galeries = await sanityClient.fetch(`
  *[_type == "galeries"][] | order(_createdAt desc) {
    _id,
    name,
    slug,
    mainImage,
    mainImageAlt,
    _createdAt
  }
`);

  return {
    props: { galeries: galeries || {}, navConfig, pageDescription },
    revalidate: 3600
  };
}

export default Galeries;
