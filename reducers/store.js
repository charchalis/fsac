// store.js
import { configureStore } from '@reduxjs/toolkit';
import friendListReducer from './friendListReducer';
import navigatorOnChatroom from './navigatorOnChatroom';

const store = configureStore({
  reducer: {
    friendList: friendListReducer,
    onChatroom: navigatorOnChatroom,
  },
});

export default store;
