import React, { useState } from 'react';
import { compose } from 'redux';
import { Formik, Form, Field, FieldProps } from 'formik';
import { connect } from 'react-redux';

import { withFirebase, WithFirebaseProps } from 'components/Firebase';
import { withSnackbar, WithSnackbarProps } from 'notistack';

// Actions
import { setAuthUser } from 'actions/session';

// Components
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  FormHelperText,
} from '@material-ui/core';
import CustomEditor from 'components/CustomEditor';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

// Helpers
import { INITIAL_POST_FORM_VALUES } from './constants';
import { successNotification, errorNotification } from 'helpers/snackbar';
import { postSchema } from './validation/schema';

// Types
import { FirebaseError } from 'firebase';
import { FormattedMessage, useIntl, MessageDescriptor } from 'react-intl';
import messages from './messages';
import { uploadAndReplaceImages } from './helpers';

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
    <Container component="main" maxWidth="md">
      <Grid container className={classes.paper}>
        <Grid item xs={12}>
          <Typography variant="h1">
            <FormattedMessage {...messages.createNewPost} />
          </Typography>
        </Grid>
        <Formik
          initialValues={INITIAL_POST_FORM_VALUES}
          validationSchema={postSchema}
          onSubmit={async (values, actions) => {
            setIsLoading(true);

            // TODO: handle image upload errors
            const newContent = await uploadAndReplaceImages(
              values.content,
              firebase
            );

            firebase
              .doCreatePost(values.title, newContent)
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
                  {({ field, meta: { touched, error } }: FieldProps<any>) => (
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
                          shrink: classes.titleInputLabelShrinked,
                        },
                      }}
                      onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault();
                        }
                      }}
                      error={touched && !!error}
                      helperText={touched && error ? error : ' '}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name="content">
                  {({
                    field,
                    meta: { touched, error },
                    form,
                  }: FieldProps<any>) => (
                    <>
                      <CustomEditor
                        {...field}
                        onChange={(value) =>
                          form.setFieldValue('content', value)
                        }
                        onBlur={form.handleBlur('content')}
                        error={touched && !!error}
                      />
                      {
                        <FormHelperText error>
                          {touched && error ? error : ' '}
                        </FormHelperText>
                      }
                    </>
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isLoading}
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
      </Grid>
    </Container>
  );
};

const mapDispatchToProps = { setAuthUser };

export default compose<any>(
  withFirebase,
  withSnackbar,
  connect(null, mapDispatchToProps)
)(withStyles(styles)(PostForm));
