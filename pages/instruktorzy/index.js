import axios from 'axios';
import Head from 'next/head';
import { Fragment } from 'react';
import Collapsible from 'react-collapsible';
import { BsChevronDown } from 'react-icons/bs';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import { API_URL } from '../../src/configs/api';
import { getNavConfig } from '../../src/configs/nav';
import styles from './index.module.scss';

const Instructors = ({ instructors, pageDescription }) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>
          Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Instruktorzy i pomocnicy -
          oyama-karate.eu
        </title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Instruktorzy i pomocnicy - oyama-karate.eu`}
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
      <article className={styles.infoPage}>
        <section className={styles.mainContent}>
          <div className={styles.instructorsPage}>
            <div className={styles.container}>
              <h1>Nasi instruktorzy i pomocnicy</h1>
              <h2>Wybierz instruktora, o którym chcesz przeczytać: </h2>
              {instructors.map((el) => (
                <Fragment key={`instructor-collapse-${el.id}`}>
                  <Collapsible
                    className='instructors'
                    trigger={
                      <>
                        <h3>{`${el.title} ${el.name}, ${el.degree}`}</h3>{' '}
                        <BsChevronDown />
                      </>
                    }
                    // open={instructorId && instructorId == el.id}
                  >
                    <div
                      className={`${styles.text} ql-editor`}
                      dangerouslySetInnerHTML={{ __html: el.content }}
                    ></div>
                  </Collapsible>
                </Fragment>
              ))}
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
  const data = await axios.get(`${API_URL}/instructors`);
  const navConfig = await getNavConfig();
  const pageDesc = await axios.get(`${API_URL}/homepage/description`);
  const pageDescription = pageDesc.data.data.defaultPageDescription;

  return {
    props: { instructors: data.data.data || {}, navConfig, pageDescription },
    revalidate: 3600
  };
}

export default Instructors;
