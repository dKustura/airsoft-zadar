import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import PostForm from 'components/PostForm';
import PostView from 'components/PostView';
import { Routes } from 'helpers/constants';

interface Props {}

const PostRoute: React.FC<Props> = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/new`} component={PostForm} />
      <Route path={`${match.path}/:id`} component={PostView} />
      <Redirect to={Routes.HOME} />
    </Switch>
  );
};

export default PostRoute;
