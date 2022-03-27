import axios from 'axios';
import Head from 'next/head';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import Sections from '../../src/components/shared/Sections/Sections';
import SectionSelector from '../../src/components/shared/SectionSelector/SectionSelector';
import { API_URL } from '../../src/configs/api';
import { getNavConfig } from '../../src/configs/nav';
import { SectionsProvider } from '../../src/context/sections/SectionsContext';
import styles from './index.module.scss';

function SectionsPage({ section, pageDescription }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>
          Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Nasze sekcje - oyama-karate.eu
        </title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Nasze sekcje - oyama-karate.eu`}
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
  const data = await axios.get(`${API_URL}/sections/labels`);
  const section = await axios.get(
    `${API_URL}/sections/${data.data.data[0].id}`
  );
  const navConfig = await getNavConfig();
  const pageDesc = await axios.get(`${API_URL}/homepage/description`);
  const pageDescription = pageDesc.data.data.defaultPageDescription;

  return {
    props: { section: section.data.data || {}, navConfig, pageDescription },
    revalidate: 3600
  };
}

export default SectionsPage;
