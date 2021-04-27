import * as React from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

// Components
import {
  Container,
  Grid,
  MenuItem,
  MenuList,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import ProfileSettings from 'components/ProfileSettings';
import PasswordSettings from 'components/PasswordSettings';
import AdminSettings from 'components/AdminSettings';

// Helpers
import messages from './messages';
import { subRoutes } from './constants';
import { Routes } from 'helpers/constants';

const Settings = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const match = useRouteMatch();
  const history = useHistory();

  const onSettingsMenuItemClick = (subRoute: string) => () => {
    history.push(`${match.path}${subRoute}`);
  };

  const onProfileSettingsClick = onSettingsMenuItemClick(subRoutes.PROFILE);

  const onPasswordSettingsClick = onSettingsMenuItemClick(subRoutes.PASSWORD);

  const onAdminSettingsClick = onSettingsMenuItemClick(subRoutes.ADMIN);

  return (
    <Container component="div" maxWidth={isSmallScreen ? 'sm' : 'lg'}>
      <Grid container style={{ paddingTop: 64 }}>
        <Grid item xs={12} sm={12} md={4}>
          <Paper>
            <MenuList>
              <MenuItem onClick={onProfileSettingsClick}>
                <Typography>
                  <FormattedMessage {...messages.profileSettingsMenuItem} />
                </Typography>
              </MenuItem>
              <MenuItem onClick={onPasswordSettingsClick}>
                <Typography>
                  <FormattedMessage {...messages.passwordSettingsMenuItem} />
                </Typography>
              </MenuItem>
              <MenuItem onClick={onAdminSettingsClick}>
                <Typography>
                  {/* <FormattedMessage {...messages.passwordSettingsMenuItem} /> */}
                  Admin
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography style={{ color: 'red' }}>
                  <FormattedMessage {...messages.signOutMenuItem} />
                </Typography>
              </MenuItem>
            </MenuList>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={8}>
          <Grid container>
            <Switch>
              <Route
                path={`${match.path}${subRoutes.PASSWORD}`}
                component={PasswordSettings}
              />
              <Route
                path={[match.path, `${match.path}${subRoutes.ADMIN}`]}
                component={AdminSettings}
              />
              <Route
                path={[match.path, `${match.path}${subRoutes.PROFILE}`]}
                component={ProfileSettings}
              />
              <Redirect to={Routes.HOME} />
            </Switch>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
