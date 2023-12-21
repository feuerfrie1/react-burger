import { createSlice } from "@reduxjs/toolkit";
import { makeOrder } from "./actions";

const initialState = {
  loading: false,
  error: false,
  order: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeOrder.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(makeOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload.order.number;
    });
    builder.addCase(makeOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
  selectors: {
    selectOrderNumber: (state) => state.order,
  },
});

const { actions, reducer, selectors } = orderSlice;

export const { clearOrder } = actions;
export const { selectOrderNumber } = selectors;
export default reducer;
