import {createSlice} from '@reduxjs/toolkit';
import {AccessTokenState} from '../types';

const initialState: AccessTokenState = {};

const accessTokenSlice = createSlice({
  name: 'user/token',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.token = action.payload;
    },
    removeAccessToken: state => {
      state.token = undefined;
    },
  },
});

export const {setAccessToken, removeAccessToken} = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
