import { combineReducers } from '@reduxjs/toolkit';

// Import your individual reducers here
import socketReducer from './socketReducer';


const rootReducer = combineReducers({
  socket: socketReducer, // Add your individual reducers here
});

export default rootReducer;