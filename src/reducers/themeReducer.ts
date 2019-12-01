import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { TOGGLE_THEME } from './constants';

export type ThemeState = Readonly<{
  mode: 'light' | 'dark';
}>;

const initialState: ThemeState = {
  mode: 'light',
};

const toggle = createReducer(initialState.mode).handleType(
  TOGGLE_THEME,
  (state, action) =>
    state.map(item =>
      item.id === action.payload
        ? { ...item, completed: !item.completed }
        : item
    )
);

export default combineReducers({
  toggle,
});
