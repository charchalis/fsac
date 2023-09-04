import { createSlice } from '@reduxjs/toolkit';

const friendListReducer = createSlice({
  name: 'friendList',
  initialState: {
    list: [],
  },
  reducers: {
    log: (state) => console.log("friendList:", state.list),
    setFriendList: (state, action) => {state.list = action.payload},
    addFriend: (state, action) => {state.list.push(action.payload)},
    fsac: (state, action) => {
      
      const friendId = action.payload.friendId;
      const timespan = action.payload.timespan;
      const friendIndex = state.list.findIndex(friend => friend.id === friendId);
      
      if (friendIndex !== -1) {
        state.list[friendIndex].timespan = timespan; 
      } else {
        console.log("Friend not found in the array.");
      }
    },
    receiveFsac: (state, action) => {
      
      const friendId = action.payload.friendId;
      const friendIndex = state.list.findIndex(friend => friend.id === friendId);
      
      if (friendIndex !== -1) {
        state.list[friendIndex].timespan = 1; 
      } else {
        console.log("Friend not found in the array.");
      }
    }
 
  },
});

export const { log, setFriendList, addFriend, fsac, receiveFsac } = friendListReducer.actions;
export default friendListReducer.reducer;