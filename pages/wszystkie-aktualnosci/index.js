import axios from 'axios';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { sanityClient } from '../../sanity';
import LeftArrow from '../../src/components/Icons/LeftArrow';
import RightArrow from '../../src/components/Icons/RightArrow';
import ArticlesList from '../../src/components/shared/ArticlesList/ArticlesList';
import Loader from '../../src/components/shared/Loader/Loader';
import { API_URL } from '../../src/configs/api';
import { getNavConfig } from '../../src/configs/nav';
import styles from './index.module.scss';

const itemsPerPage = 3;

const NewsPage = ({ allArticles, categories, pageDescription }) => {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    numberOfPages: Math.ceil(allArticles / itemsPerPage)
  });
  const [filteredByCategory, setFilteredByCategory] = useState('all');
  const [articles, setArtciles] = useState(allArticles);
  const [shownArticles, setShownArticles] = useState(
    allArticles.slice(itemsPerPage)
  );

  useEffect(async () => {
    const articlesToShow =
      filteredByCategory !== 'all'
        ? allArticles.filter(
            (el) => el.articleCategory.name === filteredByCategory
          )
        : allArticles;

    setPagination({
      currentPage: page,
      numberOfPages: Math.ceil(articlesToShow.length / itemsPerPage)
    });

    const slicedArticles = Array.from(
      articlesToShow.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    );

    setArtciles(articlesToShow);
    setShownArticles(slicedArticles);
  }, [page, filteredByCategory]);

  const changePage = (direction) => {
    if (direction === 'LEFT' && pagination.currentPage > 1) {
      setPage(page - 1);
    } else if (
      direction === 'RIGHT' &&
      pagination.currentPage < pagination.numberOfPages
    ) {
      setPage(page + 1);
    }
  };

  const getPagination = () => {
    const paginationElements = [];

    for (let i = 1; i < Math.ceil(articles.length / itemsPerPage) + 1; i++) {
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
            <section>
              <ArticlesList
                className={styles.articlesList}
                numberOfItems={itemsPerPage}
                articlesToShow={shownArticles}
                additionalClass={styles.articlesContainer}
              />

              {articles.length > 0 && articles.length / itemsPerPage > 1 && (
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
          </div>
        </section>
      </div>
    </>
  );
};

// This also gets called at build time
export async function getStaticProps() {
  const navConfig = await getNavConfig();

  const categories = await sanityClient.fetch(`
    *[_type == "articleCategories"][] {
      name
    }
  `);

  const articlesResult = await sanityClient.fetch(
    `
    *[
      _type == "articles" && date < now()
    ] | order(date desc)[] {
      _id,
      articleCategory->{name},
      date,
      mainImage,
      mainImageAlt,
      slug,
      shortenDesc,
      title,
    }
  `
  );

  const homepageData = await sanityClient.fetch(`
    *[_type == "homepage"][0] {
      seoDesc,
      seoKeyWords,
    }
  `);

  const pageDescription = homepageData.seoDesc;

  return {
    props: {
      allArticles: articlesResult,
      categories: categories || {},
      navConfig,
      pageDescription
    },
    revalidate: 3600
  };
}

export default NewsPage;
