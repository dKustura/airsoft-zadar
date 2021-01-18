import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useParams, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// Components
import PostRead from 'components/PostRead';
import { useFirebase } from 'components/Firebase';
import { Container, Fab, useMediaQuery, Theme, Grid } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import EditIcon from '@material-ui/icons/Edit';
import AuthorizationCheck from 'components/AuthorizationCheck';

// Helpers
import { Routes } from 'helpers/constants';
import { errorNotification } from 'helpers/snackbar';
import { RouteParams } from './types';
import { selectAuthUser } from './selectors';
import { RootState } from 'types';
import { UserRole } from 'helpers/roles';
import messages from './messages';
import { useStyles } from './styles';

interface OwnProps {}

type Props = OwnProps & ReturnType<typeof mapStateToProps>;

const PostView = ({ authUser }: Props): JSX.Element | null => {
  const [post, setPost] = useState<any>();
  const { id } = useParams<RouteParams>();
  const firebase = useFirebase();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  const redirectToPostEdit = () => {
    history.push(`${Routes.POST_EDIT}/${id}`);
  };

  useEffect(() => {
    firebase
      .getPost(id)
      .then((post) => {
        const postData = post?.data;
        if (!postData) {
          history.push(Routes.HOME);
        } else {
          setPost(postData);
        }
      })
      .catch(() => {
        enqueueSnackbar(
          'An error occurred while loading post.',
          errorNotification
        );
      });
  }, [firebase, id, enqueueSnackbar, history]);

  if (!post) {
    return null;
  } else {
    return (
      <>
        <Container component="main" maxWidth="md">
          <Grid container>
            <AuthorizationCheck
              userRoles={authUser?.roles}
              authorizedRoles={[UserRole.Admin]}
            >
              {isSmallScreen ? (
                <Fab
                  color="primary"
                  aria-label="edit"
                  className={classes.smallScreenEditButton}
                  onClick={redirectToPostEdit}
                >
                  <EditIcon />
                </Fab>
              ) : (
                <div className={classes.bigScreenEditButtonRelativeContainer}>
                  <div className={classes.bigScreenEditButtonAbsoluteContainer}>
                    <div className={classes.bigScreenEditButton}>
                      <Fab
                        variant="extended"
                        color="primary"
                        onClick={redirectToPostEdit}
                      >
                        <CreateIcon className={classes.extendedIcon} />
                        <FormattedMessage {...messages.editPost} />
                      </Fab>
                    </div>
                  </div>
                </div>
              )}
            </AuthorizationCheck>
            <PostRead title={post.title} content={post.content} />
          </Grid>
        </Container>
      </>
    );
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    authUser: selectAuthUser(state),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
