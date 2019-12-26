import { createReducer, ActionType } from 'typesafe-actions';

import { SET_AUTH_USER } from 'actions/constants';
import { sessionActions } from 'actions';

export type SessionState = {
  authUser: firebase.User | null;
};

export type SessionAction = ActionType<typeof sessionActions>;

const initialState: SessionState = {
  authUser: null,
};

export default createReducer<SessionState, SessionAction>(
  initialState
).handleAction(SET_AUTH_USER, (state, action) => {
  return { ...state, authUser: action.payload.authUser };
});
