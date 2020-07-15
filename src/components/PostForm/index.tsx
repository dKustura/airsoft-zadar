import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Prompt, useHistory, useLocation } from 'react-router-dom';
import { Action, Location } from 'history';
import { Formik, Form, Field, FieldProps } from 'formik';

import { useFirebase } from 'components/Firebase';
import { useSnackbar } from 'notistack';

// Components
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  FormHelperText,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import CustomEditor from 'components/CustomEditor';
import PopupDialog from 'components/PopupDialog';
import PostPreview from './PostPreview';

// Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import SendIcon from '@material-ui/icons/Send';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

// Helpers
import { INITIAL_POST_FORM_VALUES } from './constants';
import { successNotification, errorNotification } from 'helpers/snackbar';
import { postSchema } from './validation/schema';
import { Routes } from 'helpers/constants';

// Types
import { FirebaseError } from 'firebase';
import { FormattedMessage, useIntl, MessageDescriptor } from 'react-intl';
import messages from './messages';
import { uploadAndReplaceImages } from './helpers';
import Thumbnail from './Thumbnail';

interface Props extends WithStyles<typeof styles> {}

const PostForm: React.FC<Props> = ({ classes }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isPostSaved, setIsPostSaved] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const [thumbnail, setThumbnail] = useState<string>();

  const firebase = useFirebase();
  const { enqueueSnackbar } = useSnackbar();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();

  const onPreviewClick = useCallback(() => {
    setIsPreview(true);
  }, []);

  const onPreviewExit = useCallback(() => {
    setIsPreview(false);
  }, []);

  const onThumbnailSelection = useCallback((imageSrc: string) => {
    setThumbnail(imageSrc);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const uploadThumbnail = useCallback(() => {
    if (!thumbnail) return null;

    const uploadTask = firebase.doUploadThumbnail(thumbnail);

    return uploadTask.then(
      async (snapshot) => {
        return await snapshot.ref.getDownloadURL();
      },
      (error) => {
        // TODO: handle thumbnail upload error
      }
    );
  }, [firebase, thumbnail]);

  const handleNavigationBlock = useCallback(
    (nextLocation: Location, action: Action): boolean => {
      if (action === 'POP' && isPreview) {
        setIsPreview(false);
        return false;
      } else if (
        nextLocation.pathname !== location.pathname &&
        !confirmedNavigation &&
        !isPostSaved
      ) {
        setIsPreview(false);
        setIsModalVisible(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    [isPreview, isPostSaved, location, confirmedNavigation]
  );

  const handleConfirmNavigationClick = useCallback(() => {
    setIsModalVisible(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      history.push(lastLocation.pathname);
    }
  }, [confirmedNavigation, lastLocation, history]);

  return (
    <Formik
      initialValues={INITIAL_POST_FORM_VALUES}
      validationSchema={postSchema}
      onSubmit={async (values, actions) => {
        setIsLoading(true);

        // TODO: handle image upload errors
        Promise.all([
          uploadAndReplaceImages(values.content, firebase),
          uploadThumbnail(),
        ]).then(([newContent, thumbnailUrl]) => {
          firebase
            .doCreatePost(thumbnailUrl, values.title, newContent)
            .then(() => {
              setIsLoading(false);
              setIsPostSaved(true);
              enqueueSnackbar('Blog post created', successNotification);
              history.push(Routes.HOME);
            })
            .catch((error: FirebaseError) => {
              setIsLoading(false);
              actions.setSubmitting(false);
              enqueueSnackbar(error.message, errorNotification);
            });
        });
      }}
    >
      <Container component="main" maxWidth="md">
        <Prompt message={handleNavigationBlock} />
        <PopupDialog
          isOpen={isModalVisible}
          title={intl.formatMessage(messages.dialogTitle as MessageDescriptor)}
          description={intl.formatMessage(
            messages.dialogDescription as MessageDescriptor
          )}
          cancelLabel={intl.formatMessage(
            messages.dialogCancel as MessageDescriptor
          )}
          confirmLabel={intl.formatMessage(
            messages.dialogConfirm as MessageDescriptor
          )}
          handleClose={closeModal}
          handleConfirm={handleConfirmNavigationClick}
        />
        <Grid container className={classes.paper}>
          {isPreview ? (
            <PostPreview onExit={onPreviewExit} />
          ) : (
            <>
              <Grid container wrap="wrap-reverse" alignItems="center">
                <Grid
                  container
                  item
                  sm={12}
                  md={6}
                  justify={isSmallScreen ? 'center' : 'flex-start'}
                >
                  <Grid item>
                    <Thumbnail
                      src={thumbnail}
                      onSelection={onThumbnailSelection}
                      shouldCloseDialogs={isModalVisible}
                    />
                  </Grid>
                </Grid>
                <Grid container item sm={12} md={6} justify="center">
                  <Grid item>
                    <Typography variant="h1" style={{ textAlign: 'center' }}>
                      <FormattedMessage {...messages.createNewPost} />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="title">
                      {({
                        field,
                        meta: { touched, error },
                      }: FieldProps<any>) => (
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
                  <Grid container spacing={2} justify="center">
                    <Grid item xs={12} sm={4}>
                      <Button
                        variant="contained"
                        startIcon={<VisibilityIcon />}
                        fullWidth
                        onClick={onPreviewClick}
                      >
                        <FormattedMessage {...messages.preview} />
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isLoading}
                        startIcon={<SendIcon />}
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
                </Grid>
              </Form>
            </>
          )}
        </Grid>
      </Container>
    </Formik>
  );
};

export default withStyles(styles)(PostForm);
