import React, { useEffect, useState } from 'react';
import PostRead from 'components/PostRead';
import { useParams, useHistory } from 'react-router-dom';
import { useFirebase } from 'components/Firebase';
import { Container } from '@material-ui/core';
import { useSnackbar } from 'notistack';

// Helpers
import { Routes } from 'helpers/constants';
import { errorNotification } from 'helpers/snackbar';
import { RouteParams } from './types';

interface Props {}

const PostView: React.FC<Props> = () => {
  const [post, setPost] = useState<any>();
  const { id } = useParams<RouteParams>();
  const firebase = useFirebase();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    firebase
      .getPost(id)
      .then((post) => {
        const postData = post.data();
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
      <Container component="main" maxWidth="md">
        <PostRead title={post.title} content={post.content} />
      </Container>
    );
  } else {
    return null;
  }
};

export default PostView;
