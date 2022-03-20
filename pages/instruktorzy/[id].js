import axios from 'axios';
import { Fragment } from 'react';
import Collapsible from 'react-collapsible';
import { BsChevronDown } from 'react-icons/bs';
import ArticleListContainer from '../../src/components/shared/ArticleListContainer/ArticleListContainer';
import Loader from '../../src/components/shared/Loader/Loader';
import { API_URL } from '../../src/configs/api';
import styles from './index.module.scss';

const Instructors = ({ instructors, instructorId }) => {
  if (!instructorId || !instructors) {
    return <Loader />;
  }

  return (
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
                      <h3>{` ${el.title} ${el.name}, ${el.degree}`}</h3>{' '}
                      <BsChevronDown />
                    </>
                  }
                  open={instructorId && instructorId == el.id}
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
  );
};

export async function getStaticPaths() {
  const data = await axios.get(`${API_URL}/instructors`);
  const params = [];
  data.data.data.forEach((el) => {
    params.push({
      params: {
        id: el.id
      }
    });
  });

  return {
    paths: params,
    fallback: true // false or 'blocking'
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const data = await axios.get(`${API_URL}/instructors`);

  return {
    props: { instructors: data.data.data || {}, instructorId: params.id },
    revalidate: 3600
  };
}

export default Instructors;
