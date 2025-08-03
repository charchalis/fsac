import { createSlice } from '@reduxjs/toolkit';

const navigatorOnChatroom = createSlice({
  name: 'navigatorOnChatRoom',
  initialState: {
    onChatroom: false,
    chatroomId: {}
  },
  reducers: {
    setOnChatroom: (state, action) => {state.onChatroom = action.payload},
    setChatroomId: (state, action) => {state.chatroomId = action.payload}
  },
});

export const { setOnChatroom, setChatroomId } = navigatorOnChatroom.actions;
export default navigatorOnChatroom.reducer;