import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useParams, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// Components
import PostRead from 'components/PostRead';
import { useFirebase } from 'components/Firebase';
import {
  Button,
  Container,
  Fab,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
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

const PostView: React.FC<Props> = ({ authUser }) => {
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

  if (post) {
    return (
      <>
        <AuthorizationCheck
          userRoles={authUser?.roles}
          authorizedRoles={[UserRole.Admin]}
        >
          {isSmallScreen ? (
            <Fab
              color="secondary"
              aria-label="edit"
              className={classes.smallScreenEditButton}
              onClick={redirectToPostEdit}
            >
              <EditIcon />
            </Fab>
          ) : (
            <div className={classes.bigScreenEditButtonContainer}>
              <div className={classes.bigScreenEditButton}>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<CreateIcon />}
                  fullWidth
                  onClick={redirectToPostEdit}
                >
                  <FormattedMessage {...messages.editPost} />
                </Button>
              </div>
            </div>
          )}
        </AuthorizationCheck>

        <Container component="main" maxWidth="md">
          <PostRead title={post.title} content={post.content} />
        </Container>
      </>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    authUser: selectAuthUser(state),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
