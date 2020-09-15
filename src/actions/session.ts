import { createAction } from 'typesafe-actions';
import { SET_AUTH_USER } from './constants';
import { User } from 'types';

export const setAuthUser = createAction(SET_AUTH_USER, (action) => {
  return (authUser: User | null) => action({ authUser });
});
