import { combineReducers } from 'redux';
import ThemeReducer from './themeReducer';

const rootReducer = combineReducers({
  theme: ThemeReducer,
});

export default rootReducer;
