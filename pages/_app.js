import { useEffect, useState } from 'react';
import Footer from '../src/components/Footer/Footer';
import Header from '../src/components/Header/Header';
import '../styles/lib/sass/reset.scss';
import '../styles/globals.scss';
import 'react-quill/dist/quill.core.css';

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
