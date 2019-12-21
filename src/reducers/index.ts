import { combineReducers } from 'redux';
import ThemeReducer from './themeReducer';
import SessionReducer from './sessionReducer';

const rootReducer = combineReducers({
  theme: ThemeReducer,
  session: SessionReducer,
});

export default rootReducer;
