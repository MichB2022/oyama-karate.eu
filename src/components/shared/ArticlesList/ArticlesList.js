import axios from 'axios';
import { useEffect, useState } from 'react';
import { sanityClient } from '../../../../sanity';
import { API_URL } from '../../../configs/api';
import ArticleItem from '../ArticleItem/ArticleItem';
import styles from './articlesList.module.scss';

const ArticlesList = ({
  animation,
  numberOfItems,
  currentArticleId,
  articlesToShow,
  additionalClass
}) => {
  const [articles, setArtciles] = useState(articlesToShow || []);

  useEffect(async () => {
    if (articlesToShow) {
      setArtciles(articlesToShow);
    } else {
      const data = await sanityClient.fetch(
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
        }[0...${numberOfItems}]
      `
      );

      setArtciles(data);
    }
  }, []);

  useEffect(async () => {
    if (articlesToShow) {
      setArtciles(articlesToShow);
    }
  }, [articlesToShow]);

  const generateArticleItems = (numberOfItems, currentArticleId, animation) => {
    const ArticleItems = [];
    for (let i = 0; i < numberOfItems; i++) {
      const article = articles[i];
      if (i === Number.parseInt(currentArticleId)) {
        numberOfItems++;
      } else {
        ArticleItems.push(
          <div
            key={`article ${i}`}
            data-aos={animation}
            className={styles.articleItemContainerMargin}
          >
            <ArticleItem article={article} id={i} />
          </div>
        );
      }
    }

    return ArticleItems;
  };

  return (
    <div className={`${additionalClass} ${styles.articlesContainer}`}>
      {generateArticleItems(numberOfItems, currentArticleId, animation)}
    </div>
  );
};

export default ArticlesList;
