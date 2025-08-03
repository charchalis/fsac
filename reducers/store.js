// store.js
import { configureStore } from '@reduxjs/toolkit';
import friendListReducer from './friendListReducer';
import navigatorOnChatroom from './navigatorOnChatroom';
import myUserReducer from './myUserReducer';
import tabNavigationReducer from './tabNavigationReducer';
import chatroomsReducer from './chatroomsReducer';

const store = configureStore({
  reducer: {
    friendList: friendListReducer,
    chatrooms: chatroomsReducer,
    onChatroom: navigatorOnChatroom,
    myUser: myUserReducer,
    tabNavigation: tabNavigationReducer,
  },
});

export default store;
