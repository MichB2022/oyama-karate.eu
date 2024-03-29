import Head from 'next/head';
import { sanityClient } from '../../sanity';
import { getNavConfig } from '../../src/configs/nav';
import onImg from './img_on.jpg';
import rekImg from './img_rek.jpg';
import styles from './index.module.scss';
import kickboxingImg from './kickboxing.jpg';

const KickBoxingPage = ({ pageDescription }) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>
          Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Kickboxing - oyama-karate.eu
        </title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Kickboxing - oyama-karate.eu`}
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
      <section>
        <div className={styles.landingPageShadow}>
          <img
            src={kickboxingImg.src}
            alt='kickboxing landing photo'
            className={styles.kickboxingImg}
          />
          <div className={styles.vignette}>
            <p className={styles.logo}></p>
            <p className={styles.imgText}>KICKBOXING</p>
            <p className={styles.imgText}>KATOWICE</p>
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
          <div className={styles.infoAndImgContainer}>
            <div className={styles.descAndTtileContainer}>
              <div className={styles.instructorInfo}>
                <p className={styles.name}>MICHAŁ BODZIONY</p>
                <p className={styles.deg}> 3 dan oyama karate</p>
                <p className={styles.deg}>1 dan kickboxing</p>
              </div>

              <p className={styles.text}>Zaprasza na zajęcia</p>
              <p className={styles.desc}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
              </p>
            </div>

            <div className={styles.instructorImg}>
              <img src={onImg.src} alt='instructor photo' />
            </div>
          </div>
        </div>
      </section>

      <div className='container'>
        <div className={styles.belt}></div>
      </div>

      <section>
        <div className='container'>
          <div className={styles.sectionDescContainer}>
            <div className={styles.instructorImg}>
              <img src={rekImg.src} alt='instructor photo' />
            </div>

            <div className={styles.textContainer}>
              <p className={styles.text}>Zaprasza na zajęcia</p>
              <p className={styles.desc}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// This also gets called at build time
export async function getStaticProps({ params }) {
  const navConfig = await getNavConfig();
  const homepageData = await sanityClient.fetch(`
    *[_type == "homepage"][0] {
      seoDesc,
      seoKeyWords,
    }
  `);

  const pageDescription = homepageData.seoDesc;

  return {
    props: { navConfig, pageDescription },
    revalidate: 3600
  };
}

export default KickBoxingPage;
