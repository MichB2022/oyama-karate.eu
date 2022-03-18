// import { Link } from 'react-router-dom';
import { API_UPLOADS_URL } from '../../../configs/api';
import styles from './articleItem.module.scss';

function ArticleItem({ article }) {
  if (!article) {
    return null;
  }
  return (
    <article className={styles.articleItemContainer}>
      {/* <Link
        to={`/aktualnosci/${article.categoryName}/${article.slug}/${article.id}`}
      > */}
      <img
        src={`${API_UPLOADS_URL}/articles/${article.smallImgUrl}`}
        alt={article.smallImgAlt}
        className={styles.articleItemImage}
      />
      {/* </Link> */}
      <h2 className={styles.articleItemTitle}>
        {/* <Link
          to={`/aktualnosci/${article.categoryName}/${article.slug}/${article.id}`}
        > */}
        {article.title}
        {/* </Link> */}
      </h2>
      <p className={styles.articleItemDesc}>{article.shortenDesc}</p>
      {/* <Link
        to={`/aktualnosci/${article.categoryName}/${article.slug}/${article.id}`}
      > */}
      <button type='button' className={styles.articleItemButton}>
        Czytaj dalej
      </button>
      {/* </Link> */}
    </article>
  );
}

export default ArticleItem;
