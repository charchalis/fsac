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
      const { chatroomId, message, userId } = action.payload;
      const chatroom = state.list.find(room => room.id === chatroomId);

      if (chatroom) {
        if (!chatroom.messages) {
          chatroom.messages = [];
        }
        chatroom.messages.push(message);
      }
    },
    markMessagesAsSeen: (state, action) => {
      const { chatroomId, seenDate, userId } = action.payload;
      state.list = state.list.map(chatroom => {
        if (chatroom.id !== chatroomId) return chatroom;
    
        const updatedMessages = (chatroom.messages || []).map(message => {
          if (message.userId !== userId && message.date <= seenDate) {
            return { ...message, seen: true };
          }
          return message;
        });
    
        return {
          ...chatroom,
          messages: updatedMessages
        };
      });
    },

  },
});

export const { setChatrooms, addChatroom, addMessageToChat, markMessagesAsSeen } = chatroomsReducer.actions;
export default chatroomsReducer.reducer;