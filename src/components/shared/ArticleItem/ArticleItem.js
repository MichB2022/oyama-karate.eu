// import { Link } from 'react-router-dom';
import Link from 'next/link';
import urlBuilder from '@sanity/image-url';
import styles from './articleItem.module.scss';
import { sanityClient } from '../../../../sanity';

function ArticleItem({ article }) {
  if (!article) {
    return null;
  }

  return (
    <article className={styles.articleItemContainer}>
      <Link
        href={`/aktualnosci/${article.articleCategory.name.toLowerCase()}/${
          article.slug.current
        }/${article._id}`}
      >
        <a>
          <img
            src={urlBuilder(sanityClient).image(article.mainImage).url()}
            alt={article.mainImageAlt}
            className={styles.articleItemImage}
          />
        </a>
      </Link>
      <h2 className={styles.articleItemTitle}>
        <Link
          href={`/aktualnosci/${article.articleCategory.name.toLowerCase()}/${
            article.slug.current
          }/${article._id}`}
        >
          {article.title}
        </Link>
      </h2>
      <p className={styles.articleItemDesc}>{article.shortenDesc}</p>
      <Link
        href={`/aktualnosci/${article.articleCategory.name.toLowerCase()}/${
          article.slug.current
        }/${article._id}`}
      >
        <button type='button' className={styles.articleItemButton}>
          Czytaj dalej
        </button>
      </Link>
    </article>
  );
}

export default ArticleItem;
