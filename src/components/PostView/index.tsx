import React, { useEffect, useState } from 'react';
import PostRead from 'components/PostRead';
import { useParams } from 'react-router-dom';
import { useFirebase } from 'components/Firebase';
import { Container } from '@material-ui/core';

interface Props {}

const PostView: React.FC<Props> = () => {
  const [post, setPost] = useState<any>();
  const { id } = useParams();
  const firebase = useFirebase();

  useEffect(() => {
    firebase.getPost(id).then((post) => {
      const postData = post.data();
      setPost(postData);
      console.log('postData', postData);
    });
  }, [firebase, id]);

  return (
    <Container component="main" maxWidth="md">
      {post && <PostRead title={post.title} content={post.content} />}
    </Container>
  );
};

export default PostView;
