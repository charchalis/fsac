import { createSlice } from '@reduxjs/toolkit';

const chatroomsReducer = createSlice({
  name: 'chatrooms',
  initialState: {
    list: []
  },
  reducers: {
    setChatrooms: (state, action) => {state.list = action.payload},
    addChatroom: (state, action) => {state.list.push(action.payload)},
    addMessageToChat: (state, action) => {
      const { chatroomId, message } = action.payload;
      const chatroom = state.list.find(room => room.id === chatroomId);

      console.log("AAAAAAAAAAA " + chatroom)
      console.log(chatroomId)
      console.log(state.list)
      if (chatroom) {
        if (!chatroom.messages) {
          chatroom.messages = [];
        }
        console.log("AAAAAAAAAAAa")
        chatroom.messages.push(message);
      }
    }
  },
});

export const { setChatrooms, addChatroom, addMessageToChat } = chatroomsReducer.actions;
export default chatroomsReducer.reducer;