import Head from 'next/head';
import { sanityClient } from '../../sanity';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import Sections from '../../src/components/shared/Sections/Sections';
import SectionSelector from '../../src/components/shared/SectionSelector/SectionSelector';
import { getNavConfig } from '../../src/configs/nav';
import { SectionsProvider } from '../../src/context/sections/SectionsContext';
import styles from './index.module.scss';

function SectionsPage({ section, pageDescription }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Nasze sekcje</title>
        <meta property='og:title' content={`Nasze sekcje`} key='ogtitle' />
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
        <article className={styles.sectionsPageContent}>
          <div className={styles.sectionsPageGridContainer}>
            <div className={styles.sectionsContent}>
              <div className={styles.container}>
                <header>
                  <h1 className={styles.title}>Nasze sekcje</h1>
                </header>
              </div>

              <SectionSelector />

              <section>
                <Sections firtsSectionToDisplay={section} />
              </section>
            </div>
            <div className={styles.articleListContainer}>
              <ArticleListContainer />
            </div>
          </div>
        </article>
      </SectionsProvider>
    </>
  );
}

// This also gets called at build time
export async function getStaticProps() {
  const navConfig = await getNavConfig();

  const labels = await sanityClient.fetch(`
    *[_type == "sections"][] {
      _id,
      label
    }
  `);

  const id = labels[0]._id;

  const section = await sanityClient.fetch(
    `
    *[_type == "sections" && _id == $id][0] {
      _id,
      name,
      label,
      mainImage,
      mainImageAlt,
      description,
      address,
      googleMapsLink,
      days,
      scheduleRows
    }
  `,
    { id }
  );

  const homepageData = await sanityClient.fetch(`
    *[_type == "homepage"][0] {
      seoDesc,
      seoKeyWords
    }
  `);

  const pageDescription = homepageData.seoDesc;

  return {
    props: { section: section || {}, navConfig, pageDescription },
    revalidate: 3600
  };
}

export default SectionsPage;
