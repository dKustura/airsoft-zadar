import { createSelector } from 'reselect';
import { RootState } from 'types';

export const selectThemeState = (state: RootState) => state.theme;

export const selectSessionState = (state: RootState) => state.session;

export const selectThemeMode = createSelector(
  selectThemeState,
  (themeState) => themeState.mode
);

export const selectAuthUser = createSelector(
  selectSessionState,
  (sessionState) => sessionState.authUser
);

export const selectUserDisplayName = createSelector(
  selectSessionState,
  (sessionState) => sessionState.authUser?.displayName
);
