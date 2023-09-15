import { createSlice } from '@reduxjs/toolkit';

const tabNavigation = createSlice({
  name: 'tabNavigation',
  initialState: {
    screen: 'friends',
    notifications: {friends: 9, fsacs: "+", events: null, settings: null}
  },
  reducers: {
    setScreen: (state, action) => {
      state.screen = action.payload
      state.notifications[state.screen] = null
    },
    addNotification: (state, action) => {

      const screen = action.payload.screen

      if(state.screen != screen && state.notifications[screen] != '...'){
        const count = state.notifications[screen] + 1
        state.notifications[screen] += 1

        if(count >= 10) state.notifications[screen] ="+"
        else state.notifications[screen]= count

      }
    }
  },
});

export const { setScreen, addNotification } = tabNavigation.actions;
export default tabNavigation.reducer;