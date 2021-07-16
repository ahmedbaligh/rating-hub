import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/data';

import { Switch, Route, Redirect } from 'react-router-dom';

import { Home, Product, Error404, Admin } from './pages';
import { Loading, Footer, Header } from './components';

import { changeLanguage } from './redux/actions/language';
import { toggleDarkTheme } from './redux/actions/darkTheme';
import { getAuthedUser } from './redux/actions/authedUser';
import { axiosDefault } from './utils/api';

const App = ({
  darkTheme: dark,
  language,
  authedUser,
  changeLanguage,
  toggleDarkTheme,
  getAuthedUser,
  loading
}) => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      axiosDefault.defaults.headers.common['Authorization'] =
        localStorage.getItem('token');
      getAuthedUser();
    }
    if (!authedUser) {
      if (
        localStorage.getItem('language') &&
        localStorage.getItem('language') !== language
      )
        changeLanguage(localStorage.getItem('language'));

      if (localStorage.getItem('dark')) {
        const localDark = JSON.parse(localStorage.getItem('dark'));
        if (localDark !== dark) toggleDarkTheme();
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <ThemeProvider theme={{ ...theme, dark }}>
      {loading ? <Loading /> : ''}
      <Route
        exact
        path={['/', '/product/:slug', '/404-NOT-FOUND', '/scraper']}
        component={Header}
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/404-NOT-FOUND" component={Error404} />
        <Route exact path="/admin-panel" component={Admin} />
        <Route render={props => <Redirect to="/404-NOT-FOUND" {...props} />} />
      </Switch>
      <Route
        exact
        path={['/', '/product/:slug', '/404-NOT-FOUND', '/scraper']}
        component={Footer}
      />
    </ThemeProvider>
  );
};

const mapStateToProps = ({ darkTheme, language, authedUser, loading }) => ({
  darkTheme,
  language,
  authedUser,
  loading
});

const mapDispatchToProps = dispatch => ({
  changeLanguage: lang => dispatch(changeLanguage(lang)),
  toggleDarkTheme: () => dispatch(toggleDarkTheme()),
  getAuthedUser: () => dispatch(getAuthedUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
