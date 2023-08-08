// store.js
import { configureStore } from '@reduxjs/toolkit';
import friendListReducer from './friendListReducer';

const store = configureStore({
  reducer: {
    friendList: friendListReducer,
  },
});

export default store;
