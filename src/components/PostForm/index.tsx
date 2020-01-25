import React, { useState } from 'react';
import { compose } from 'redux';
import { Formik, Form, Field } from 'formik';
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
import { postSchema } from './validationSchema';

// Types
import { FirebaseError } from 'firebase';
import { FormattedMessage, useIntl, MessageDescriptor } from 'react-intl';
import messages from './messages';

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
  const intl = useIntl();

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MenuBookIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage {...messages.createNewPost} />
        </Typography>
        <Formik
          initialValues={INITIAL_POST_FORM_VALUES}
          validationSchema={postSchema}
          onSubmit={(values, actions) => {
            setIsLoading(true);

            firebase
              .doCreatePost(values.title, values.content)
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
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field name="title">
                  {({ field, meta: { touched, error } }: any) => (
                    <TextField
                      {...field}
                      label={intl.formatMessage(
                        messages.titleLabel as MessageDescriptor
                      )}
                      multiline
                      variant="outlined"
                      fullWidth
                      autoFocus
                      required
                      InputProps={{
                        classes: {
                          multiline: classes.titleInput,
                        },
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.titleInputLabel,
                        },
                      }}
                      onKeyPress={event => {
                        if (event.key === 'Enter') {
                          event.preventDefault();
                        }
                      }}
                      helperText={touched && error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name="content">
                  {({ field, meta: { touched, error } }: any) => (
                    <TextField
                      {...field}
                      label={intl.formatMessage(
                        messages.contentLabel as MessageDescriptor
                      )}
                      multiline
                      variant="outlined"
                      fullWidth
                      required
                      InputProps={{
                        classes: {
                          multiline: classes.contentInput,
                        },
                      }}
                      helperText={touched && error}
                    />
                  )}
                </Field>
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
                    <FormattedMessage {...messages.submitButton} />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Form>
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
