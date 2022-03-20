import axios from 'axios';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import { API_UPLOADS_URL, API_URL } from '../../src/configs/api';
import { SectionsProvider } from '../../src/context/sections/SectionsContext';
import styles from './index.module.scss';

const KinderPage = ({ kinderData }) => {
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

  return {
    props: {
      kinderData: data.data.data
    },
    revalidate: 3600
  };
}

export default KinderPage;
