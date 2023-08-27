// store.js
import { configureStore } from '@reduxjs/toolkit';
import friendListReducer from './friendListReducer';
import navigatorOnChatroom from './navigatorOnChatroom';
import myUserReducer from './myUserReducer';

const store = configureStore({
  reducer: {
    friendList: friendListReducer,
    onChatroom: navigatorOnChatroom,
    myUser: myUserReducer,
  },
});

export default store;
