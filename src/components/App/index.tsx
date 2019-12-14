import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getTheme } from 'components/Theme';
import Home from 'components/Home';
import SignUp from 'components/SignUp';
import { RootState } from 'types';

import { selectThemeMode } from './selectors';

interface OwnProps {}

type Props = OwnProps & ReturnType<typeof mapStateToProps>;

const App: React.FC<Props> = ({ theme }: Props) => {
  return (
    <MuiThemeProvider theme={getTheme(theme)}>
      <CssBaseline />
      <Helmet>
        <title>Airsoft Klub Zadar</title>
      </Helmet>

      <Switch>
        <Route path="/signUp" component={SignUp} />
        <Route path="/" component={Home} />
      </Switch>
    </MuiThemeProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  return { theme: selectThemeMode(state) };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);