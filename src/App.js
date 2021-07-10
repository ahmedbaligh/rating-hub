import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { Footer, Header } from './components';
import { theme } from './utils/data';
import Product from './pages/Product/Product';

const App = ({ darkTheme: dark, language }) => {
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <ThemeProvider theme={{ ...theme, dark }}>
      <Header />
      <Product />
      <Footer />
    </ThemeProvider>
  );
};

const mapStateToProps = ({ darkTheme, language }) => ({ darkTheme, language });

export default connect(mapStateToProps)(App);
