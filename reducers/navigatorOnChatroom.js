import { createSlice } from '@reduxjs/toolkit';

const navigatorOnChatroom = createSlice({
  name: 'navigatorOnChatRoom',
  initialState: {
    onChatroom: false,
    friend: {}
  },
  reducers: {
    setOnChatroom: (state, action) => {state.onChatroom = action.payload},
    setChatFriend: (state, action) => {state.friend = action.payload}
  },
});

export const { setOnChatroom, setChatFriend } = navigatorOnChatroom.actions;
export default navigatorOnChatroom.reducer;