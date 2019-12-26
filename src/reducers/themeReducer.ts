import { createReducer, ActionType } from 'typesafe-actions';

import { TOGGLE_THEME } from 'actions/constants';
import { themeActions } from 'actions';
import { ThemeMode } from './constants';

export type ThemeState = {
  mode: ThemeMode;
};

export type ThemeAction = ActionType<typeof themeActions>;

const initialState: ThemeState = {
  mode: ThemeMode.Dark,
};

export default createReducer<ThemeState, ThemeAction>(
  initialState
).handleAction(TOGGLE_THEME, (state, _) => {
  let mode = ThemeMode.Light;

  if (state.mode === ThemeMode.Light) {
    mode = ThemeMode.Dark;
  }
  return { ...state, mode };
});
