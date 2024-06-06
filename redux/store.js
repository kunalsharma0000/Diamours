// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer'; // Import the root reducer

const store = configureStore({
  reducer: rootReducer,
  // Add middleware or other store configuration here if needed
});

export default store;
