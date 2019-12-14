import React from 'react';
import { connect } from 'react-redux';
import { toggleTheme } from 'actions';

// Components
import {
  withStyles,
  WithStyles,
  Button,
  Grid,
  Link,
  Container,
  IconButton,
} from '@material-ui/core';
import SunIcon from '@material-ui/icons/Brightness7';
import MoonIcon from '@material-ui/icons/Brightness2';

import styles from './styles';
// import logo from 'logo.png';

// Helpers
import { ThemeMode } from 'reducers/constants';
import { ButtonLink } from 'helpers';

// Selectors
import { selectThemeMode } from './selectors';

// Types
import { RootState } from 'types';

interface OwnProps extends WithStyles<typeof styles> {}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const Header: React.FC<Props> = ({ classes, theme, toggleTheme }) => {
  return (
    <div className={classes.headerContainer}>
      <Container maxWidth="xl">
        <Grid container spacing={1} justify="space-between" alignItems="center">
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              {/* <Grid item>
                <img src={logo} alt="logo" />
              </Grid> */}
              <Grid item>
                <Link component="button" variant="h6" color="inherit">
                  Home
                </Link>
              </Grid>
              <Grid item>
                <Link component="button" variant="h6" color="inherit">
                  Blog
                </Link>
              </Grid>
              <Grid item>
                <Link component="button" variant="h6" color="inherit">
                  About
                </Link>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <IconButton
                  aria-label="toggle theme"
                  color="inherit"
                  title="Toggle theme"
                  onClick={() => toggleTheme()}
                >
                  {theme === ThemeMode.Light ? <MoonIcon /> : <SunIcon />}
                </IconButton>
              </Grid>
              <Grid item>
                <Button
                  aria-label="sign up"
                  variant="outlined"
                  color="inherit"
                  component={ButtonLink}
                  to="/signUp"
                >
                  Sign up
                </Button>
              </Grid>
              <Grid item>
                <Button aria-label="sign in" variant="outlined" color="inherit">
                  LogIn
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { theme: selectThemeMode(state) };
};

const mapDispatchToProps = { toggleTheme };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));