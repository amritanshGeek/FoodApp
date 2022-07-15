import {createSlice} from '@reduxjs/toolkit';
import {cartDataType} from '../types';

const initialState: cartDataType = {};

const userSlice = createSlice({
  initialState,
  name: 'cartData',
  reducers: {
    setCartData: (state, action) => {
      if (state.data?.length) {
        let alreadyAdded = false;
        state.data.map(item => {
          if (item.idMeal === action.payload.idMeal) {
            item.cartCount = item.cartCount + 1;
            alreadyAdded = true;
          }
          return item;
        });
        if (!alreadyAdded) {
          state.data = [...state.data, {...action.payload, cartCount: 1}];
        }
      } else {
        state.data = [{...action.payload, cartCount: 1}];
      }
    },
    reduceCartCount: (state, action) => {
      if (state.data?.length) {
        let alreadyAdded = false;
        state.data.map(item => {
          if (item.idMeal === action.payload.idMeal) {
            item.cartCount = item.cartCount - 1;
            alreadyAdded = true;
          }
          return item;
        });
        if (!alreadyAdded) {
          state.data = [...state.data, {...action.payload, cartCount: 1}];
        }
      } else {
        state.data = [{...action.payload, cartCount: 1}];
      }
    },
    updateCartData: (state, action) => {
      if (state.data?.length) {
        state.data.map(item => {
          if (item.idMeal === action.payload.idMeal) {
            item.cartCount = action.payload.cartCount;
          }
          return item;
        });
      } else {
        state.data = [...action.payload];
      }
    },
    removefromCart: (state, action) => {
      state.data = state.data?.filter(
        item => item.idMeal !== action.payload.idMeal,
      );
    },
    emptyCartData: state => {
      state.data = undefined;
    },
  },
});

export const {
  setCartData,
  updateCartData,
  removefromCart,
  emptyCartData,
  reduceCartCount,
} = userSlice.actions;

export default userSlice.reducer;
