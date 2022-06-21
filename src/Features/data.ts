import { createSlice } from '@reduxjs/toolkit';
import { UsersDataState } from '../types';

const initialState: UsersDataState = {};

const userSlice = createSlice({
  initialState,
  name: 'data',
  reducers: {
    setUsersDataDetails: (state, action) => {
      state.data = {data:{...state.data,...action.payload}};
    },
    removeUsersDataDetails: state => {
      state.data = undefined;
    },
  },
});

export const { setUsersDataDetails, removeUsersDataDetails } = userSlice.actions;

export default userSlice.reducer;
