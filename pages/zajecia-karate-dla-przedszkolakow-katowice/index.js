import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import { API_UPLOADS_URL, API_URL } from '../../src/configs/api';
import { getNavConfig } from '../../src/configs/nav';
import { SectionsProvider } from '../../src/context/sections/SectionsContext';
import styles from './index.module.scss';

const KinderPage = ({ kinderData, pageDescription }) => {
  const imagesRef = useRef();
  const {
    firstImgUrl,
    firstImgAlt,
    secondImgUrl,
    secondImgAlt,
    thirdImgUrl,
    thirdImgAlt
  } = kinderData;

  const images = [
    {
      url: firstImgUrl,
      alt: firstImgAlt
    },
    {
      url: secondImgUrl,
      alt: secondImgAlt
    },
    {
      url: thirdImgUrl,
      alt: thirdImgAlt
    }
  ];

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
        <title>
          Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Zajęcia Karate dla przedszkolaków -
          oyama-karate.eu
        </title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Zajęcia Karate dla przedszkolaków - oyama-karate.eu`}
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
      <SectionsProvider>
        <article className={styles.kinderPageContent}>
          <div className={styles.kinderPageGridContainer}>
            <div className={styles.kinderContent}>
              <div className={styles.container}>
                <header>
                  <h1 className={styles.title}>{kinderData.title}</h1>
                </header>
                <main>
                  <section ref={imagesRef} className={styles.imagesWrapper}>
                    {images.map((img, index) => (
                      <img
                        key={index}
                        className={index !== 0 ? styles.hidden : ''}
                        src={`${API_UPLOADS_URL}/preschooler/${img.url}`}
                        alt={img.alt}
                      />
                    ))}
                  </section>
                  <section
                    className={`${styles.text} ql-editor`}
                    dangerouslySetInnerHTML={{ __html: kinderData.content }}
                  ></section>
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
      </SectionsProvider>
    </>
  );
};

// This also gets called at build time
export async function getStaticProps() {
  const data = await axios.get(`${API_URL}/preschooler`);
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
      kinderData: data.data.data,
      navConfig,
      pageDescription
    },
    revalidate: 3600
  };
}

export default KinderPage;
