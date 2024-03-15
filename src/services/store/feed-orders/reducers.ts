import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "../../../utils/types";
import {
  feedOrdersWsConnecting,
  feedOrdersWsOpen,
  feedOrdersWsClose,
  feedOrdersWsError,
  feedOrdersWsMessage,
} from "./actions";

type TInitialState = {
  status: string;
  orders: Array<TOrder>;
  connectionError: string;
  totalToday: number;
  total: number;
};

export const initialState: TInitialState = {
  status: "OFFLINE",
  orders: [],
  connectionError: "",
  totalToday: 0,
  total: 0,
};

const feedOrdersSlice = createSlice({
  name: "feedOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(feedOrdersWsConnecting, (state) => {
        state.status = "WebsocketStatus.CONNECTING";
      })
      .addCase(feedOrdersWsOpen, (state) => {
        state.status = "WebsocketStatus.ONLINE";
      })
      .addCase(feedOrdersWsClose, (state) => {
        state.status = "WebsocketStatus.OFFLINE";
      })
      .addCase(feedOrdersWsError, (state, action) => {
        state.connectionError = action.payload;
      })
      .addCase(feedOrdersWsMessage, (state, action) => {
        state.orders = action.payload.orders;
        state.totalToday = action.payload.totalToday;
        state.total = action.payload.total;
      });
  },
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
  },
});

const { selectors, reducer } = feedOrdersSlice;

export const { selectFeedOrders, selectTotalToday, selectTotal } = selectors;

export default reducer;
