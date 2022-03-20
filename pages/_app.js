import Footer from '../src/components/Footer/Footer';
import Header from '../src/components/Header/Header';
import ScrollToTop from '../src/components/ScrollToTop';
import '../styles/globals.scss';
import '../styles/lib/sass/reset.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <ScrollToTop>
        <Component {...pageProps} />
      </ScrollToTop>
      <Footer />
    </>
  );
}

export default MyApp;
