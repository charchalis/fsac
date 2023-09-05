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

      //shift position to among the fsacosos
      state.list = state.list.sort((a,b) => {
        if (a.timespan === 1 && b.timespan !== 1) {
          return -1; // a comes first
        } else if (a.timespan !== 1 && b.timespan === 1) {
          return 1; // b comes first
        } else {
          return a.timespan - b.timespan; // compare ages for non -1 values
        }
      })

    }
 
  },
});

export const { log, setFriendList, addFriend, fsac, receiveFsac } = friendListReducer.actions;
export default friendListReducer.reducer;