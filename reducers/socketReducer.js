import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import {API_URL} from '../constants'

const socketReducer = createSlice({
  name: 'socket',
  initialState: {
    socket: io(API_URL),
  },
  reducers: {
    socketTest: (state) => {
        console.log("socket test reducer")
    },
  },
});

export const { socketTest } = socketReducer.actions;
export default socketReducer.reducer;
