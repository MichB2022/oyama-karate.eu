import urlBuilder from '@sanity/image-url';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsFacebook, BsInstagram, BsWhatsapp } from 'react-icons/bs';
import { FiLink } from 'react-icons/fi';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import { sanityClient } from '../../../../sanity';
import ArticleBody from '../../../../src/components/ArticleBody/ArticleBody';
import ArticleListContainer from '../../../../src/components/shared/ArticleListContainer/ArticleListContainer';
import Loader from '../../../../src/components/shared/Loader/Loader';
import NotFound from '../../../../src/components/shared/NotFound/notFound';
import { getNavConfig } from '../../../../src/configs/nav';
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
    const data = await sanityClient.fetch(
      `
      *[
        _type == "articles" && _id == $id
      ][0] {
        _id,
        articleCategory->{name},
        seoDesc,
        seoKeyWords,
        tags,
        date,
        mainImage,
        mainImageAlt,
        slug,
        content,
        title,
      }
    `,
      { id }
    );
    setArtcile(data);
    setLoader(false);
  }, [id]);

  const generateTags = (tags) => {
    let result = '';
    tags.map((el) => `#${el} `);
    return result;
  };

  if (!article) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{article.title}</title>
        <meta property='og:title' content={article.title} key='ogtitle' />
        <meta key='robots' name='robots' content='index,follow' />
        <meta key='googlebot' name='googlebot' content='index,follow' />
        <meta name='description' content={article.seoDest} />
        <meta
          property='og:description'
          content={article.seoDesc}
          key='ogdesc'
        />
      </Head>
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
                        Kategoria: {article.articleCategory.name}
                      </span>
                      |
                      <span className={styles.paddingLeft}>
                        Dodano:{' '}
                        {new Date(article.date.slice(0, 10)).toLocaleDateString(
                          'pl'
                        )}
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
                      <BsInstagram className={styles.mediaIcon} />

                      <WhatsappShareButton
                        url={
                          typeof window !== 'undefined' && window.location.href
                        }
                        hashtag={generateTags(article.tags)}
                        quote='Udostępnij artykuł przez facebooka!'
                      >
                        <BsWhatsapp className={styles.mediaIcon} />
                      </WhatsappShareButton>
                      <div
                        onClick={copyTextToClipboard(
                          typeof window !== 'undefined' && window.location.href
                        )}
                      >
                        <FiLink className={styles.mediaIcon} />
                      </div>
                      <a href=''></a>
                    </div>
                  </section>

                  <img
                    className={styles.articleImage}
                    src={urlBuilder(sanityClient)
                      .image(article.mainImage)
                      .url()}
                    alt={article.imgAlt}
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
                    <ArticleBody body={article.content} />
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

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(`
    *[_type == "articles"][] {
      _id,
      slug,
      articleCategory -> {name}
    }
  `);

  return {
    paths: paths.map((path) => ({
      params: {
        id: path._id,
        slug: path.slug.current,
        category: path.articleCategory.name.toString().toLowerCase()
      }
    })),
    fallback: true
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const { slug = '', id = '', category = '' } = params;

  const navConfig = await getNavConfig();

  const data = await sanityClient.fetch(
    `
    *[
      _type == "articles" && _id == $id
    ][0] {
      _id,
      articleCategory->{name},
      seoDesc,
      seoKeyWords,
      tags,
      date,
      mainImage,
      mainImageAlt,
      slug,
      content,
      title,
    }
  `,
    { id }
  );

  return {
    props: { firstArticle: data || {}, navConfig },
    revalidate: 3600
  };
}

export default ArticlePage;
