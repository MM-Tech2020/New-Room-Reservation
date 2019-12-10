import { combineReducers } from 'redux';

import { dataReducer } from './data/reducer';
import { selectedPlaygroundReducer } from './selected-playground/reducer';
import { authorizationReducer } from './authorization/reducer';

export const reducer = combineReducers({
  data: dataReducer,
  selectedPlayground: selectedPlaygroundReducer,
  authorization: authorizationReducer
});
