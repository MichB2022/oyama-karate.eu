import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta
            property='og:site_name'
            content='oyama-karate.eu'
            key='ogsitename'
          />
          <meta key='robots' name='robots' content='index,follow' />
          <meta key='googlebot' name='googlebot' content='index,follow' />
          <link rel='icon' href='/logo.png' />
          {/* <link
            href='https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@700&family=Open+Sans:wght@300;400;500;600;700;800&display=swap'
            rel='stylesheet'
          /> */}
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
