import urlBuilder from '@sanity/image-url';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax';
import { sanityClient } from '../sanity';
import karateImg from '../src/assets/karate.jpeg';
import ArticlesList from '../src/components/shared/ArticlesList/ArticlesList';
import Button from '../src/components/shared/Button/Button';
import ContactForm from '../src/components/shared/ContactForm/ContactForm';
import GroupsAd from '../src/components/shared/GroupsAd/GroupsAd';
import InstructorCard from '../src/components/shared/InstructorCard/InstructorCard';
import { getNavConfig } from '../src/configs/nav';
import styles from './index.module.scss';

export default function Home({ instructors, homepage }) {
  const [numOfArticleItems, setNumOfArticleItems] = useState(6);
  //resize handling useEffect
  useEffect(() => {
    const handleResize = () => {
      setNumOfArticleItems(window.innerWidth > 1440 ? 6 : 4);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const pageDescription =
    homepage.seoDesc === ''
      ? homepage.defaultPageDescription
      : homepage.seoDesc;

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>
          Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - strona główna - oyama-karate.eu
        </title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - strona główna - oyama-karate.eu`}
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
      <div className={styles.homepageContent}>
        <section className={styles.landing}>
          <img
            className={styles.landingImage}
            src={urlBuilder(sanityClient).image(homepage.mainImage).url()}
            alt={homepage.imgAlt}
          />
          <div className={styles.welcomeCardWrapper}>
            <div className={styles.welcomeCard}>
              <div className={styles.container}>
                <h1>
                  {homepage.text.split(' ').map((el) => (
                    <>
                      <span key={`title-${el}`}>{el}</span>{' '}
                    </>
                  ))}
                </h1>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.groups}>
          <div className={styles.container}>
            <h2>U nas znajdziesz treningi dla...</h2>
            <GroupsAd />
          </div>
        </section>

        <section className={styles.annoucements}>
          <h1 data-aos='zoom-in'>ZAPISY</h1>
          <h2 className={styles.phone} data-aos='zoom-in'>
            <BsFillTelephoneFill />
            <div>{homepage.phone}</div>
          </h2>
        </section>

        <section className={styles.contact}>
          <ParallaxProvider>
            <ParallaxBanner
              className={styles.contactParallax}
              layers={[
                {
                  image: karateImg.src,
                  amount: 0.5
                }
              ]}
              style={{
                height: '100%',
                padding: ''
              }}
            >
              <div className={styles.contactContainer}>
                <h1 data-aos='zoom-in'>Skontaktuj się z nami!</h1>
                <ContactForm animation='fade-right' btnAnimation='zoom-in' />
              </div>
            </ParallaxBanner>
          </ParallaxProvider>
        </section>

        <section className={styles.instructor}>
          <div className={styles.container}>
            <h2 data-aos='zoom-in' className={styles.instructorsHeader}>
              Instruktor i pomocnicy
            </h2>
            <div className={styles.instructorsWrapper}>
              {instructors.map((el) => (
                <InstructorCard
                  key={el.id}
                  animation={'zoom-in'}
                  instructor={el}
                />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.newsList}>
          <div className={styles.container}>
            <h2 className={styles.newsH2} data-aos='zoom-in'>
              Aktualności
            </h2>

            <ArticlesList
              className={styles.articlesList}
              numberOfItems={numOfArticleItems}
              animation='zoom-in'
              additionalClass={styles.articlesContainer}
            />

            <div className={styles.newsBtn}>
              <Button
                text='Więcej aktualności'
                onClick={
                  () => {}
                  // navigate('/wszystkie-aktualnosci', { replace: true })
                }
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// This also gets called at build time
export async function getStaticProps() {
  const navConfig = await getNavConfig();
  const homepageData = await sanityClient.fetch(`
    *[_type == "homepage"][0] {
      text,
      seoDesc,
      seoKeyWords,
      mainImage,
      mainImageAlt,
      phone
    }
  `);

  const instructors = await sanityClient.fetch(`
    *[_type == "instructors"][] {
      _id,
      name,
      title,
      degree,
      mainImage,
      mainImageAlt,
      shortenDesc
    }
  `);

  return {
    props: {
      instructors: instructors,
      navConfig: navConfig || {},
      homepage: homepageData
    },
    revalidate: 3600
  };
}
