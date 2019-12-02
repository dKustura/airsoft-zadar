import React from 'react';
import { connect } from 'react-redux';
import { toggleTheme } from 'actions';

import {
  withStyles,
  WithStyles,
  Button,
  Grid,
  Link,
  Container,
  Typography,
} from '@material-ui/core';
import styles from './styles';
import logo from 'logo.png';

// Types
import { RootState } from 'types';

// Selectors
import { selectThemeMode } from './selectors';

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
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => toggleTheme()}
                >
                  Theme: {theme}
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="inherit">
                  Sign up
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="inherit">
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
