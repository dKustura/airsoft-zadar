import { createSelector } from 'reselect';
import { RootState } from 'types';

export const selectSessionState = (state: RootState) => state.session;

export const selectAuthUser = createSelector(
  selectSessionState,
  (sessionState) => sessionState.authUser
);

export const authUserSelector = (state: RootState) => selectAuthUser(state);
