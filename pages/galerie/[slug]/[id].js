import urlBuilder from '@sanity/image-url';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Gallery from 'react-grid-gallery';
import { sanityClient } from '../../../sanity';
import ArticleListContainer from '../../../src/components/shared/ArticleListContainer/ArticleListContainer';
import Button from '../../../src/components/shared/Button/Button';
import NotFound from '../../../src/components/shared/NotFound/notFound';
import { getNavConfig } from '../../../src/configs/nav';
import styles from './index.module.scss';

const Galery = ({ galery }) => {
  const router = useRouter();

  if (!galery || galery === undefined || galery === {}) {
    return <NotFound />;
  }

  const images = galery
    ? galery.images.map((img) => {
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
        <title>{galery.name || 'Galeria'}</title>
        <meta property='og:title' content={galery.name} key='ogtitle' />
        <meta key='robots' name='robots' content='index,follow' />
        <meta key='googlebot' name='googlebot' content='index,follow' />
        <meta name='description' content={galery.seoDesc} />
        <meta property='og:description' content={galery.seoDesc} key='ogdesc' />
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
  const paths = await sanityClient.fetch(`
    *[_type == "galeries"][] {
      _id,
      slug
    }
  `);

  return {
    paths: paths.map((path) => ({
      params: {
        slug: path.slug.current,
        id: path._id
      }
    })),
    fallback: true
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const { id = '', slug = '' } = params;

  const navConfig = await getNavConfig();

  const galery = await sanityClient.fetch(
    `
    *[_type == "galeries" && slug.current == $slug && _id == $id][0] {
        _id,
        name,
        seoDesc,
        seoKeyWords,
        slug,
        images
      }
    `,
    { slug, id }
  );

  return {
    props: { galery: galery || {}, navConfig },
    revalidate: 3600
  };
}

export default Galery;
