import React from 'react';
import { Formik, Form } from 'formik';

// Components
import {
  withStyles,
  WithStyles,
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
} from '@material-ui/core';
import { withFirebase } from 'components/Firebase';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Styling
import styles from './styles';

// Helpers
import { INITIAL_SIGNUP_FORM_VALUES } from './constants';

// Types
import { WithFirebase } from 'components/Firebase/context';

interface Props extends WithStyles<typeof styles>, WithFirebase {}

const SignUp: React.FC<Props> = ({ classes, firebase }: Props) => {
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
            console.log({ values, actions });
            firebase
              .doCreateUserWithEmailAndPassword(values.email, values.password)
              .then(credentials => {
                console.log('credentials', credentials);
                actions.setSubmitting(false);
              })
              .catch(error => {
                console.log('error', error);
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
                Sign Up
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

export default withFirebase(withStyles(styles)(SignUp));
