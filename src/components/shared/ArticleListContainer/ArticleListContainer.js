import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import ArticlesList from '../ArticlesList/ArticlesList';
import Button from '../Button/Button';
import styles from './ArticleListContainer.module.scss';

function ArticleListContainer({ currentArticleId }) {
  // const navigate = useNavigate();
  const [numOfItems, setNumOfItems] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setNumOfItems(
        window.innerWidth >= 768 && window.innerWidth < 1440 ? 4 : 3
      );
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={styles.articleListContainer}>
      <header className={styles.newsTitleContainer}>
        <h2 className={styles.newsH2}>Aktualności</h2>
      </header>
      <main>
        <ArticlesList
          className={styles.articleList}
          numberOfItems={numOfItems}
          currentArticleId={currentArticleId}
        />

        <div className={styles.buttonContainer}>
          <Button
            text='Więcej aktualności'
            onClick={
              () => {}
              // navigate('/wszystkie-aktualnosci', { replace: true })
            }
          />
        </div>
      </main>
    </section>
  );
}

export default ArticleListContainer;
