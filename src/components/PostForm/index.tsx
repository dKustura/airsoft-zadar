import React, { useState } from 'react';
import { compose } from 'redux';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';

import { withFirebase, WithFirebaseProps } from 'components/Firebase';
import { withSnackbar, WithSnackbarProps } from 'notistack';

// Actions
import { setAuthUser } from 'actions/session';

// Components
import {
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

// Helpers
import { INITIAL_POST_FORM_VALUES } from './constants';
import { successNotification, errorNotification } from 'helpers/snackbar';

// Types
import { FirebaseError } from 'firebase';

type Props = WithStyles<typeof styles> &
  WithFirebaseProps &
  WithSnackbarProps &
  typeof mapDispatchToProps;

const PostForm: React.FC<Props> = ({
  classes,
  firebase,
  enqueueSnackbar,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MenuBookIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create new post
        </Typography>
        <Formik
          initialValues={INITIAL_POST_FORM_VALUES}
          onSubmit={(values, actions) => {
            setIsLoading(true);

            firebase
              .posts()
              .add({ title: values.title, content: values.content })
              .then(() => {
                setIsLoading(false);
                enqueueSnackbar('Blog post created', successNotification);
              })
              .catch((error: FirebaseError) => {
                setIsLoading(false);
                actions.setSubmitting(false);
                enqueueSnackbar(error.message, errorNotification);
              });
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="title"
                    name="title"
                    label="Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    autoFocus
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="content"
                    name="content"
                    label="Content"
                    multiline
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    // rows={4}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    fullWidth
                  >
                    {isLoading ? (
                      <CircularProgress
                        color="secondary"
                        size={24}
                        thickness={6}
                      />
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

const mapDispatchToProps = { setAuthUser };

export default compose<any>(
  withFirebase,
  withSnackbar,
  connect(null, mapDispatchToProps)
)(withStyles(styles)(PostForm));
