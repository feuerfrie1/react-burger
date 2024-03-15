import { createSlice } from "@reduxjs/toolkit";

import { TOrder } from "../../../utils/types";
import {
  profileOrdersWsClose,
  profileOrdersWsConnecting,
  profileOrdersWsError,
  profileOrdersWsMessage,
  profileOrdersWsOpen,
} from "./actions";

type TInitialState = {
  status: string;
  orders: Array<TOrder>;
  connectionError: string;
};

export const initialState: TInitialState = {
  status: "OFFLINE",
  orders: [],
  connectionError: "",
};
const profileOrdersSlice = createSlice({
  name: "profileOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileOrdersWsConnecting, (state) => {
        state.status = "WebsocketStatus.CONNECTING";
      })
      .addCase(profileOrdersWsOpen, (state) => {
        state.status = "WebsocketStatus.ONLINE";
      })
      .addCase(profileOrdersWsClose, (state) => {
        state.status = "WebsocketStatus.OFFLINE";
      })
      .addCase(profileOrdersWsError, (state, action) => {
        state.connectionError = action.payload;
      })
      .addCase(profileOrdersWsMessage, (state, action) => {
        state.orders = action.payload.orders.reverse();
      });
  },
  selectors: {
    selectProfileOrders: (state) => state.orders,
  },
});

const { selectors, reducer } = profileOrdersSlice;

export const { selectProfileOrders } = selectors;

export default reducer;
