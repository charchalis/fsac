import { createSlice } from '@reduxjs/toolkit';

const myUserReducer = createSlice({
  name: 'myUser',
  initialState: {
      user: {}
  },
  reducers: {
    log: (state) => console.log("my user:", state.user),
    setUser: (state, action) => {state.user = action.payload},
    
  },
});

export const { log, setUser } = myUserReducer.actions;
export default myUserReducer.reducer;