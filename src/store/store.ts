import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  configureStore,
  Action,
  ThunkAction,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import rootReducer, { RootState } from './rootReducer';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['accessToken', 'userDetails','allUserDetails'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Store
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [thunk],
});

export const persistor = persistStore(store);

/**
 * AppDispatch
 */
export type AppDispatch = typeof store.dispatch;

/**
 * dispatch
 */
export const dispatch: AppDispatch = store.dispatch;

/**
 * useAppDispatch
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * AppThunk
 */
export type AppThunk<T = void> = ThunkAction<
  T,
  RootState,
  unknown,
  Action<string>
>;
