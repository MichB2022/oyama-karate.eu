import axios from 'axios';
import { useEffect, useState } from 'react';
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
  const [articles, setArtciles] = useState([]);

  useEffect(async () => {
    if (articlesToShow) {
      setArtciles(articlesToShow);
    } else {
      const data = await axios.get(
        `${API_URL}/articles?page=1&perpage=${numberOfItems}`
      );
      setArtciles(data.data.data);
    }
  }, []);

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
