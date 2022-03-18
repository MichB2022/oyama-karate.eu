import axios from 'axios';
import { useContext } from 'react';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import Sections from '../../src/components/shared/Sections/Sections';
import SectionSelector from '../../src/components/shared/SectionSelector/SectionSelector';
import { API_URL } from '../../src/configs/api';
import SectionsContext, {
  SectionsProvider
} from '../../src/context/sections/SectionsContext';
import styles from './index.module.scss';

function SectionsPage({ section }) {
  return (
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
  );
}

// This also gets called at build time
export async function getStaticProps() {
  const data = await axios.get(`${API_URL}/sections/labels`);
  const section = await axios.get(
    `${API_URL}/sections/${data.data.data[0].id}`
  );

  return { props: { section: section.data.data || {} }, revalidate: 3600 };
}

export default SectionsPage;
