import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserState } from '../types';

const initialState: UserState & { isUpdating: boolean } = {
  isLoading: false,
  isUpdating: false,
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUserDetails: (state, action) => {
      state.data = action.payload;
    },
    removeUserDetails: state => {
      state.data = undefined;
    },
  },
});

export const { setUserDetails, removeUserDetails } = userSlice.actions;

export default userSlice.reducer;
