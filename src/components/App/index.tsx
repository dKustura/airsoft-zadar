import * as React from 'react';
import { connect } from 'react-redux';
import './App.scss';

// Providers
import { IntlProvider } from 'react-intl';
import { MuiThemeProvider } from '@material-ui/core/styles';

// Componenets
import { getTheme } from 'components/Theme';
import App from './App';

// i18n
import translations from 'translations/index.json';

// Types
import { RootState } from 'types';

// Helpers
import { selectThemeMode, selectAuthUser, selectLocale } from './selectors';
import {
  withAuthentication,
  WithAuthenticationProps,
} from 'components/Session';

interface OwnProps {}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  WithAuthenticationProps;

const AppWrapper: React.FC<Props> = ({ theme, locale }: Props) => {
  const messages = (translations as any)[locale];

  return (
    <IntlProvider defaultLocale="hr" locale={locale} messages={messages}>
      <MuiThemeProvider theme={getTheme(theme)}>
        <App />
      </MuiThemeProvider>
    </IntlProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    theme: selectThemeMode(state),
    authUser: selectAuthUser(state),
    locale: selectLocale(state),
  };
};

const mapDispatchToProps = {};

export default withAuthentication(
  connect(mapStateToProps, mapDispatchToProps)(AppWrapper)
);
