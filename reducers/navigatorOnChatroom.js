import { createSlice } from '@reduxjs/toolkit';

const navigatorOnChatroom = createSlice({
  name: 'navigatorOnChatRoom',
  initialState: {
    onChatroom: false,
    friendId: {}
  },
  reducers: {
    setOnChatroom: (state, action) => {state.onChatroom = action.payload},
    setChatFriendId: (state, action) => {state.friendId = action.payload}
  },
});

export const { setOnChatroom, setChatFriendId } = navigatorOnChatroom.actions;
export default navigatorOnChatroom.reducer;