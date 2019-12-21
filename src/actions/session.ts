import { createAction } from 'typesafe-actions';
import { SET_AUTH_USER } from './constants';

export const setAuthUser = createAction(SET_AUTH_USER, action => {
  return (authUser: firebase.User | null) => action({ authUser });
});
