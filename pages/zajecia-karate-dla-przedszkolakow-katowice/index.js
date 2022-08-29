import urlBuilder from '@sanity/image-url';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { sanityClient } from '../../sanity';
import ArticleBody from '../../src/components/ArticleBody/ArticleBody';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import { getNavConfig } from '../../src/configs/nav';
import styles from './index.module.scss';

const KinderPage = ({ page }) => {
  const imagesRef = useRef();

  const images = page.images.map((img) => ({
    url: urlBuilder(sanityClient).image(img).url(),
    alt: img.alt
  }));

  useEffect(() => {
    let imgIndex = 0;
    const intervalId = setInterval(() => {
      if (imagesRef && imagesRef.current) {
        imgIndex = imgIndex + 1 === images.length ? 0 : imgIndex + 1;
        const prevImgIndex = imgIndex === 0 ? images.length - 1 : imgIndex - 1;
        imagesRef.current.children[prevImgIndex].classList.add(styles.hidden);
        imagesRef.current.children[imgIndex].classList.remove(styles.hidden);
      }
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{page.title}</title>
        <meta property='og:title' content={page.title} key='ogtitle' />
        <meta key='robots' name='robots' content='index,follow' />
        <meta key='googlebot' name='googlebot' content='index,follow' />
        <meta name='description' content={page.seoDesc} />
        <meta property='og:description' content={page.seoDesc} key='ogdesc' />
      </Head>
      <article className={styles.kinderPageContent}>
        <div className={styles.kinderPageGridContainer}>
          <div className={styles.kinderContent}>
            <div className={styles.container}>
              <header>
                <h1 className={styles.title}>{page.title}</h1>
              </header>
              <main>
                <section ref={imagesRef} className={styles.imagesWrapper}>
                  {images.map((img, index) => (
                    <img
                      key={index}
                      className={index !== 0 ? styles.hidden : ''}
                      src={urlBuilder(sanityClient).image(img.url).url()}
                      alt={img.alt}
                    />
                  ))}
                </section>
                <section className={styles.text}>
                  <ArticleBody body={page.content} />
                </section>
                <section className={styles.ad}>
                  <Link href='/harmonogram-zajec-karate'>
                    Sprawdź nasz harmonogram zajęć dla przedszkolaków
                  </Link>
                </section>
              </main>
            </div>
          </div>
          <div className={styles.articleListContainer}>
            <ArticleListContainer />
          </div>
        </div>
      </article>
    </>
  );
};

// This also gets called at build time
export async function getStaticProps() {
  const navConfig = await getNavConfig();

  const page = await sanityClient.fetch(`
    *[_type == "preschoolers"][0] {
      seoDesc,
      seoKeyWords,
      images,
      title,
      content
    }
  `);

  return {
    props: {
      page,
      navConfig
    },
    revalidate: 3600
  };
}

export default KinderPage;
