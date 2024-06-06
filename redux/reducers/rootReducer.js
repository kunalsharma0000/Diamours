// redux/reducers/rootReducer.js

import { combineReducers } from 'redux';
import currencyRateReducer from './counterReducer'; // Import your reducers

const rootReducer = combineReducers({
  currencyRate: currencyRateReducer,
  // Add more reducers here if needed
});

export default rootReducer;
