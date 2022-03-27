import axios from 'axios';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import LeftArrow from '../../src/components/Icons/LeftArrow';
import RightArrow from '../../src/components/Icons/RightArrow';
import ArticlesList from '../../src/components/shared/ArticlesList/ArticlesList';
import Loader from '../../src/components/shared/Loader/Loader';
import { API_URL } from '../../src/configs/api';
import { getNavConfig } from '../../src/configs/nav';
import styles from './index.module.scss';

const itemsPerPage = 12;

const NewsPage = ({
  firstArticlesSet,
  firstPagination,
  categories,
  pageDescription
}) => {
  const [loader, setLouder] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(firstPagination);
  const [filteredByCategory, setFilteredByCategory] = useState('all');
  const [articles, setArtciles] = useState(firstArticlesSet);

  const articleRequest = async (isFilteredByCategory) => {
    const articlesResult = await axios.get(
      `${API_URL}/articles?page=${page}&perpage=${itemsPerPage}${
        isFilteredByCategory ? `&filterByCategory=${filteredByCategory}` : ''
      }
      `
    );

    setArtciles({ articles: articlesResult.data.data });
    setPagination(articlesResult.data.pagination);
  };

  useEffect(async () => {
    setLouder(true);
    await articleRequest(filteredByCategory !== 'all');
    setLouder(false);
  }, [page, filteredByCategory]);

  const changePage = (direction) => {
    if (direction === 'LEFT' && pagination.currentPage > 1) {
      setPage(page - 1);
    } else if (
      direction === 'RIGHT' &&
      pagination.currentPage < pagination.pagesCount
    ) {
      setPage(page + 1);
    }
  };

  const getPagination = () => {
    const paginationElements = [];

    for (let i = 1; i < pagination.pagesCount + 1; i++) {
      paginationElements.push(
        <div
          key={`pagination-tile-${i}`}
          className={`${styles.paginationTile} ${
            i === pagination.currentPage ? styles.paginationActive : ''
          }`}
          onClick={() => {
            if (i !== pagination.currentPage) {
              setPage(i);
            }
          }}
        >
          {i}
        </div>
      );
    }
    return paginationElements;
  };

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>
          Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Wszystkie aktualności -
          oyama-karate.eu
        </title>
        <meta
          property='og:title'
          content={`Oyama Karate Katowice - Ligota - Panewniki - Piotrowice - Podlesie,
          oraz Gliwice - Oyama-karate.eu - Wszystkie aktualności - oyama-karate.eu`}
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
      <div className={styles.newsPageContent}>
        <section className={styles.newsList}>
          <div className='container'>
            <h1 className={styles.newsH2}>Aktualności</h1>

            <form className={styles.inputsContainer}>
              <div className={styles.inputContainer}>
                <label htmlFor='sort'>filtruj po kategorii: </label>
                <select
                  name='sorting'
                  className={styles.select}
                  defaultValue={'all'}
                  onChange={(e) => setFilteredByCategory(e.target.value)}
                >
                  <option value={'all'}>-- wszystkie --</option>
                  {categories.map((el) => (
                    <option value={el.id} key={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            {loader && <Loader />}
            {!loader && (
              <section>
                {/* <div className={styles.articlesContainer}> */}
                <ArticlesList
                  className={styles.articlesList}
                  numberOfItems={itemsPerPage}
                  articlesToShow={articles.articles}
                  additionalClass={styles.articlesContainer}
                />
                {/* </div> */}

                {articles.articles.length > 0 && (
                  <div className={styles.paginationContainer}>
                    <div className={styles.paginationContent}>
                      <LeftArrow
                        className={styles.paginationArrow}
                        onClick={() => changePage('LEFT')}
                      />
                      <div className={styles.pagination}>{getPagination()}</div>
                      <RightArrow
                        className={styles.paginationArrow}
                        onClick={() => changePage('RIGHT')}
                      />
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

// This also gets called at build time
export async function getStaticProps() {
  const categories = await axios.get(`${API_URL}/categories`);
  const articlesResult = await axios.get(
    `${API_URL}/articles?page=1&perpage=${itemsPerPage}`
  );
  const navConfig = await getNavConfig();
  const pageDesc = await axios.get(`${API_URL}/homepage/description`);
  const pageDescription = pageDesc.data.data.defaultPageDescription;

  return {
    props: {
      firstArticlesSet: { articles: articlesResult.data.data },
      firstPagination: articlesResult.data.pagination,
      categories: categories.data.data || {},
      navConfig,
      pageDescription
    },
    revalidate: 3600
  };
}

export default NewsPage;
