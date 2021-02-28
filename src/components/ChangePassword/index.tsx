import * as React from 'react';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useFirebase } from 'components/Firebase';
import { useSnackbar } from 'notistack';
import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl';

// Components
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

// Helpers
import { useStyles } from './styles';
import messages from './messages';
import { errorNotification, successNotification } from 'helpers/snackbar';
import { INITIAL_CHANGE_PASSWORD_FORM_VALUES } from './constants';

// Types
import { FirebaseError } from 'firebase';

const ChangePassword = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const firebase = useFirebase();
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          <FormattedMessage {...messages.changePassword} />
        </Typography>

        <Formik
          initialValues={INITIAL_CHANGE_PASSWORD_FORM_VALUES}
          onSubmit={(values, actions) => {
            setIsLoading(true);

            firebase
              .doUpdatePasword(values.password)
              .then(() => {
                enqueueSnackbar(
                  intl.formatMessage(
                    messages.passwordChangedSuccessfully as MessageDescriptor
                  ),
                  successNotification
                );
              })
              .catch((error: FirebaseError | Error) => {
                setIsLoading(false);
                actions.setSubmitting(false);
                enqueueSnackbar(error.message, errorNotification);
              });
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    name="password"
                    label={intl.formatMessage(
                      messages.passwordLabel as MessageDescriptor
                    )}
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    autoComplete="new-password"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="passwordRepeat"
                    name="passwordRepeat"
                    label={intl.formatMessage(
                      messages.passwordRepeatLabel as MessageDescriptor
                    )}
                    type="password"
                    value={values.passwordRepeat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    autoComplete="new-password"
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
                      <FormattedMessage {...messages.changePasswordButton} />
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

export default ChangePassword;
