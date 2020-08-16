import * as React from 'react';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useFirebase } from 'components/Firebase';
import { useSnackbar } from 'notistack';
import { FormattedMessage, useIntl, MessageDescriptor } from 'react-intl';

// Components
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { withEmailVerification } from 'components/Session';

// Helpers
import { useStyles } from './styles';
import { INITIAL_ADD_ADMIN_FORM_VALUES } from './constants';
import {
  successNotification,
  errorNotification,
  warningNotification,
  infoNotification,
} from 'helpers/snackbar';
import messages from './messages';

// Types
import { FirebaseError } from 'firebase';

interface Props {}

const AddAdmin: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const intl = useIntl();
  const firebase = useFirebase();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          <FormattedMessage {...messages.addAdministrator} />
        </Typography>
        <Formik
          initialValues={INITIAL_ADD_ADMIN_FORM_VALUES}
          onSubmit={(values, actions) => {
            setIsLoading(true);
            firebase
              .doAddAdminRole(values.email)
              .then(() => {
                setIsLoading(false);
                enqueueSnackbar(
                  `${values.email} role set to Admin.`,
                  successNotification
                );
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
                    id="email"
                    name="email"
                    label={intl.formatMessage(
                      messages.emailAddress as MessageDescriptor
                    )}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    autoComplete="email"
                    fullWidth
                    autoFocus
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
                      <FormattedMessage {...messages.confirm} />
                    )}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    fullWidth
                    onClick={() => {
                      firebase.doCheckIsEmailVerified().then((res) => {
                        console.log('res', res);
                      });
                    }}
                  >
                    Check if verified
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      enqueueSnackbar('Test message!', successNotification);
                    }}
                  >
                    Success
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      enqueueSnackbar('Test message!', errorNotification);
                    }}
                  >
                    Error
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      enqueueSnackbar('Test message!', warningNotification);
                    }}
                  >
                    Warning
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      enqueueSnackbar('Test message!', infoNotification);
                    }}
                  >
                    Info
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

export default withEmailVerification(AddAdmin);
