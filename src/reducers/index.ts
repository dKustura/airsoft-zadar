import { combineReducers } from 'redux';
import ThemeReducer from './themeReducer';
import SessionReducer from './sessionReducer';
import LocaleReducer from './localeReducer';

const rootReducer = combineReducers({
  theme: ThemeReducer,
  session: SessionReducer,
  locale: LocaleReducer,
});

export default rootReducer;
