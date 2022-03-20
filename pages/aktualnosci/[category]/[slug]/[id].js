// const router = useRouter()
//   const { pid } = router.query

import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsFacebook, BsWhatsapp } from 'react-icons/bs';
import { FiLink } from 'react-icons/fi';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import ArticleListContainer from '../../../../src/components/shared/ArticleListContainer/ArticleListContainer';
import Loader from '../../../../src/components/shared/Loader/Loader';
import { API_UPLOADS_URL, API_URL } from '../../../../src/configs/api';
import styles from './index.module.scss';

const ArticlePage = ({ firstArticle }) => {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArtcile] = useState(firstArticle);
  const [loader, setLoader] = useState(false);

  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }

  function copyTextToClipboard(text) {
    if (typeof navigator !== 'undefined' && !navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text).then(
        function () {
          console.log('Async: Copying to clipboard was successful!');
        },
        function (err) {
          console.error('Async: Could not copy text: ', err);
        }
      );
    }
  }

  useEffect(async () => {
    setLoader(true);
    const data = await axios.get(`${API_URL}/articles/${id}`);
    setArtcile(data.data.data);
    setLoader(false);
  }, [id]);

  const generateTags = (tags) => {
    let result = '';
    tags.map((el) => `#${el} `);
    return result;
  };

  return (
    <>
      {loader && <Loader />}
      {article && (
        <section className={styles.articlePage}>
          <div className={styles.articlePageGridContainer}>
            <div className={styles.container}>
              <article className={styles.articleContainer}>
                <header>
                  <h1>{article.title}</h1>
                  <section className={styles.dateAndShareContainer}>
                    <p className={styles.articleDate}>
                      <span className={styles.paddingRight}>
                        Kategoria: {article.categoryName}
                      </span>
                      |
                      <span className={styles.paddingLeft}>
                        Dodano:{' '}
                        {new Date(
                          article.createdAt.slice(0, 10)
                        ).toLocaleDateString('pl')}
                      </span>
                    </p>
                    <div className={styles.shareContainer}>
                      <FacebookShareButton
                        url={
                          typeof window !== 'undefined' && window.location.href
                        }
                        hashtag={generateTags(article.tags)}
                        quote='Udostępnij artykuł przez facebooka!'
                      >
                        <BsFacebook className={styles.mediaIcon} />
                      </FacebookShareButton>
                      <div
                        onClick={copyTextToClipboard(
                          typeof window !== 'undefined' && window.location.href
                        )}
                      >
                        <FiLink className={styles.mediaIcon} />
                      </div>

                      <WhatsappShareButton
                        url={
                          typeof window !== 'undefined' && window.location.href
                        }
                        hashtag={generateTags(article.tags)}
                        quote='Udostępnij artykuł przez facebooka!'
                      >
                        <BsWhatsapp className={styles.mediaIcon} />
                      </WhatsappShareButton>
                    </div>
                  </section>
                  <img
                    src={`${API_UPLOADS_URL}/articles/${article.bigImgUrl}`}
                    alt={article.bigImgAlt}
                    className={styles.articleImage}
                  />
                </header>
                <main>
                  <div className={styles.articleTagsListContainer}>
                    <ul className={styles.articleTagsList}>
                      {article.tags.map((el) => (
                        <li className={styles.articleTag} key={el}>
                          {el}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.articleCategory}></div>
                  <div className={styles.articleText}>
                    <div
                      className='ql-editor'
                      dangerouslySetInnerHTML={{ __html: article.text }}
                    />
                  </div>
                </main>
              </article>
            </div>

            <div className={styles.articleListContainer}>
              <ArticleListContainer currentArticleId={id} />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

// This also gets called at build time
export async function getStaticProps({ params }) {
  const data = await axios.get(`${API_URL}/articles/${params.id}`);

  return { props: { firstArticle: data.data.data || {} }, revalidate: 3600 };
}

export async function getStaticPaths() {
  const data = await axios.get(`${API_URL}/articles`);
  const params = [];
  data.data.data.forEach((el) => {
    params.push({
      params: {
        category: el.categoryName.toString().toLowerCase(),
        slug: el.slug,
        id: el.id
      }
    });
  });

  return {
    paths: params,
    fallback: true // false or 'blocking'
  };
}

export default ArticlePage;
