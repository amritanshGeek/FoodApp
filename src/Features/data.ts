import { createSlice } from '@reduxjs/toolkit';
import { UsersDataState } from '../types';

const initialState: UsersDataState = {};

const userSlice = createSlice({
  initialState,
  name: 'data',
  reducers: {
    setUsersDataDetails: (state, action) => {
      if(state.data?.length){
        state.data = [...state.data,action.payload[0]];
      }else{
        state.data = [action.payload[0]];
      }
    },
    removeUsersDataDetails: state => {
      state.data = undefined;
    },
  },
});

export const { setUsersDataDetails, removeUsersDataDetails } = userSlice.actions;

export default userSlice.reducer;
