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
      const endDate = action.payload.endDate;
      const friendIndex = state.list.findIndex(friend => friend.id === friendId);
      
      if (friendIndex !== -1) {
        state.list[friendIndex].endDate = endDate; 
        state.list[friendIndex].statuss = "sent fsac"; 
      } else {
        console.log("Friend not found in the array.");
      }
    },
    receiveFsac: (state, action) => {
      
      const friendId = action.payload.friendId;
      const friendIndex = state.list.findIndex(friend => friend.id === friendId);
      
      if (friendIndex !== -1) {
        state.list[friendIndex].endDate = 1; 
      } else {
        console.log("Friend not found in the array.");
      }

      //shift position to among the fsacosos
      state.list = state.list.sort((a,b) => {
        if (a.endDate === 1 && b.endDate !== 1) {
          return -1; // a comes first
        } else if (a.endDate !== 1 && b.endDate === 1) {
          return 1; // b comes first
        } else {
          return a.endDate - b.endDate; // compare ages for non -1 values
        }
      })

    },
    declineFsac: (state, action) => {
      
      console.log("reducer decline")
      const friendId = action.payload;
      const friendIndex = state.list.findIndex(friend => friend.id === friendId);
      console.log(state.list[friendIndex])
      console.log("reducer decline")
      
      if (friendIndex !== -1) {
        state.list[friendIndex].statuss = "declined"; 
      } else {
        console.log("Friend not found in the array.");
      }

      //shift position to among the fsacosos
      state.list = state.list.sort((a,b) => {
        if (a.endDate === 1 && b.endDate !== 1) {
          return -1; // a comes first
        } else if (a.endDate !== 1 && b.endDate === 1) {
          return 1; // b comes first
        } else {
          return a.endDate - b.endDate; // compare ages for non -1 values
        }
      })

    },
    acceptFsac: (state, action) => {
      
      console.log("reducer accept")
      const friendId = action.payload.friendId;
      console.log("friendId: ", friendId)
      console.log("payload: ", action.payload)
      const chatroomId = action.payload.chatroomId
      const friendIndex = state.list.findIndex(friend => friend.id === friendId);
      console.log("reducer accept")
      
      if (friendIndex !== -1) {
        //state.list[friendIndex].endDate = null; 
        state.list[friendIndex].chatroomId = chatroomId; 
      } else {
        console.log("Friend not found in the array.");
      }

      //shift position to among the fsacosos
      state.list = state.list.sort((a,b) => {
        if (a.endDate === 1 && b.endDate !== 1) {
          return -1; // a comes first
        } else if (a.endDate !== 1 && b.endDate === 1) {
          return 1; // b comes first
        } else {
          return a.endDate - b.endDate; // compare ages for non -1 values
        }
      })

    },
  },
});

export const { log, setFriendList, addFriend, fsac, receiveFsac, declineFsac, acceptFsac } = friendListReducer.actions;
export default friendListReducer.reducer;