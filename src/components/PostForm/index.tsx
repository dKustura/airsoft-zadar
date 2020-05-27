import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Prompt, useHistory, useLocation } from 'react-router-dom';
import { Action, Location } from 'history';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Formik, Form, Field, FieldProps } from 'formik';

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
import PopupDialog from 'components/PopupDialog';
import ImageCropDialog from 'components/ImageCropDialog';
import PostPreview from './PostPreview';

// Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import ImageIcon from '@material-ui/icons/Image';

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
import Thumbnail from './Thumbnail';

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
  const [isPreview, setIsPreview] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const [isThumbnailDialogOpen, setIsThumbnailDialogOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState<string>();

  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();

  const onPreviewClick = useCallback(() => {
    setIsPreview(true);
  }, []);

  const onPreviewExit = useCallback(() => {
    setIsPreview(false);
  }, []);

  const onThumbnailClick = useCallback(() => {
    setIsThumbnailDialogOpen(true);
  }, []);

  const onThumbnailConfirm = useCallback((imageSrc: string) => {
    setThumbnail(imageSrc);
    setIsThumbnailDialogOpen(false);
  }, []);

  const onThumbnailExit = useCallback(() => {
    setIsThumbnailDialogOpen(false);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleNavigationBlock = useCallback(
    (nextLocation: Location, action: Action): boolean => {
      if (action === 'POP' && isPreview) {
        setIsPreview(false);
        return false;
      } else if (
        nextLocation.pathname !== location.pathname &&
        !confirmedNavigation
      ) {
        setIsPreview(false);
        setIsThumbnailDialogOpen(false);
        setModalVisible(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    [isPreview, location, confirmedNavigation]
  );

  const handleConfirmNavigationClick = useCallback(() => {
    setModalVisible(false);
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
      <Container component="main" maxWidth="md">
        <Prompt message={handleNavigationBlock} />
        <PopupDialog
          isOpen={modalVisible}
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
              <Grid item xs={12}>
                <Typography variant="h1">
                  <FormattedMessage {...messages.createNewPost} />
                </Typography>
              </Grid>

              <Form className={classes.form}>
                <Grid container spacing={2}>
                  {thumbnail && (
                    <Grid item>
                      <Thumbnail src={thumbnail} />
                    </Grid>
                  )}
                  <Grid container item>
                    <Grid item xs={6}>
                      <Grid container justify="flex-start">
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ImageIcon />}
                            fullWidth
                            onClick={onThumbnailClick}
                          >
                            <FormattedMessage {...messages.thumbnail} />
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container justify="flex-end">
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<VisibilityIcon />}
                            fullWidth
                            onClick={onPreviewClick}
                          >
                            <FormattedMessage {...messages.preview} />
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
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
            </>
          )}
        </Grid>

        <ImageCropDialog
          isOpen={isThumbnailDialogOpen}
          handleConfirm={onThumbnailConfirm}
          handleClose={onThumbnailExit}
        />
      </Container>
    </Formik>
  );
};

const mapDispatchToProps = { setAuthUser };

export default compose<any>(
  withFirebase,
  withSnackbar,
  connect(null, mapDispatchToProps)
)(withStyles(styles)(PostForm));
