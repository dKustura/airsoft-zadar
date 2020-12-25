import { createSelector } from 'reselect';
import { RootState } from 'types';

export const selectThemeState = (state: RootState) => state.theme;

export const selectSessionState = (state: RootState) => state.session;

export const selectThemeMode = createSelector(
  selectThemeState,
  (theme) => theme.mode
);

export const selectAuthUser = createSelector(
  selectSessionState,
  (session) => session.authUser
);
