import React from 'react';
import './App.css';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getTheme } from 'components/Theme';
import Home from 'components/Home';

interface Props {}

const App: React.FC<Props> = (props: Props) => {
  return (
    <MuiThemeProvider theme={getTheme('dark')}>
      <CssBaseline />
      <Helmet>
        <title>Airsoft Klub Zadar</title>
      </Helmet>

      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </MuiThemeProvider>
  );
};

export default App;
