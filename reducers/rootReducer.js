import { combineReducers } from '@reduxjs/toolkit';

// Import your individual reducers here
import friendListReducer from './friendListReducer';

const rootReducer = combineReducers({
  friendList: friendListReducer,
});

export default rootReducer;