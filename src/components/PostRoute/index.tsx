import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import PostForm from 'components/PostForm';
import PostView from 'components/PostView';

interface Props {}

const PostRoute: React.FC<Props> = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/add`} component={PostForm} />
      <Route path={`${match.path}/:id`} component={PostView} />
    </Switch>
  );
};

export default PostRoute;
