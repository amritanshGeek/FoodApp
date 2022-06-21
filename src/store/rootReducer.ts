import { AnyAction, combineReducers } from '@reduxjs/toolkit';

import {
  accessToken,
  userDetails,
  allUserDetails,
} from '../Features';

import { enableMapSet } from 'immer';

enableMapSet();

// Root Reducer
const combinedReducer = combineReducers({
  accessToken,
  userDetails,
  allUserDetails,
});

/**
 * Root Reducer State
 */
export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'RESET') {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
