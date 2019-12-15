import React, { useState } from 'react';
import { compose } from 'redux';
import { Formik, Form } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router';
import { withFirebase } from 'components/Firebase';
import { withSnackbar, WithSnackbarProps } from 'notistack';

// Components
import {
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  CircularProgress,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

// Helpers
import { INITIAL_SIGNUP_FORM_VALUES } from './constants';
import { successNotification, errorNotification } from 'helpers/snackbar';

// Types
import { WithFirebase } from 'components/Firebase/context';
import { FirebaseError } from 'firebase';

interface Props
  extends WithStyles<typeof styles>,
    WithFirebase,
    RouteComponentProps,
    WithSnackbarProps {}

const SignUp: React.FC<Props> = ({
  classes,
  firebase,
  history,
  enqueueSnackbar,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={INITIAL_SIGNUP_FORM_VALUES}
          onSubmit={(values, actions) => {
            setIsLoading(true);

            firebase
              .doCreateUserWithEmailAndPassword(values.email, values.password)
              .then(credentials => {
                console.log('credentials', credentials);
                enqueueSnackbar(
                  'You signed up successfully!',
                  successNotification
                );
                history.push('/');
              })
              .catch((error: FirebaseError) => {
                enqueueSnackbar(error.message, errorNotification);
              })
              .finally(() => {
                setIsLoading(false);
                actions.setSubmitting(false);
              });
          }}
          render={({ values, handleChange, handleBlur, errors, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    autoComplete="fname"
                    fullWidth
                    autoFocus
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    autoComplete="lname"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email Address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    autoComplete="email"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    autoComplete="current-password"
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                fullWidth
              >
                {isLoading ? (
                  <CircularProgress color="secondary" size={24} thickness={6} />
                ) : (
                  'Sign Up'
                )}
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        />
      </div>
    </Container>
  );
};

export default compose<any>(
  withFirebase,
  withRouter,
  withSnackbar
)(withStyles(styles)(SignUp));
