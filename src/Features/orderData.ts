import { createSlice } from '@reduxjs/toolkit';
import { orderDataType } from '../types';

const initialState: orderDataType = {};

const userSlice = createSlice({
    initialState,
    name: 'orderHistory',
    reducers: {
        setOrderHistory: (state, action) => {
            // console.log('oder action',action);
            // console.log('oder action',state);
            if(state.data?.length){
                let orderCount= state?.orderCount+1;
                state.data = [...state.data,{...action.payload, orderName: `Order ${orderCount}`}];
                state.orderCount=orderCount;
            }else{
                state.data = [{...action.payload,orderName: `Order 1`}];
                state.orderCount=1;
            }
        },
        removefromOrderHistory: (state, action) => {
            state.data = state.data?.filter((item)=>item.orderId !== action.payload.orderId);
            state.orderCount = state.orderCount - 1;
        },
        emptyOrderHistoryData: state => {
          state.data = [];
          state.orderCount = 0;
        },
    },
});

export const { setOrderHistory,removefromOrderHistory, emptyOrderHistoryData } = userSlice.actions;

export default userSlice.reducer;
