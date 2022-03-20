import 'react-quill/dist/quill.core.css';
import Footer from '../src/components/Footer/Footer';
import Header from '../src/components/Header/Header';
import '../styles/globals.scss';
import '../styles/lib/sass/reset.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
