import { createAction } from "@reduxjs/toolkit";
import { TOrder } from "../../../utils/types";
import { socketMiddleware } from "../middleware/socket-middleware";

type TFeedOrders = {
  success: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

export const feedOrdersWsConnecting = createAction("FEED_ORDERS_WS_CONNECTING");
export const feedOrdersConnect = createAction<string, "FEED_ORDERS_CONNECT">(
  "FEED_ORDERS_CONNECT"
);
export const feedOrdersDisconnect = createAction("FEED_ORDERS_DISCONNECT");
export const feedOrdersWsOpen = createAction("FEED_ORDERS_WS_OPEN");
export const feedOrdersWsClose = createAction("FEED_ORDERS_WS_CLOSE");
export const feedOrdersWsError = createAction<string, "FEED_ORDERS_WS_ERROR">(
  "FEED_ORDERS_WS_ERROR"
);
export const feedOrdersWsMessage = createAction<
  TFeedOrders,
  "FEED_ORDERS_WS_MESSAGE"
>("FEED_ORDERS_WS_MESSAGE");

export type TFeedOrdersActions =
  | ReturnType<typeof feedOrdersConnect>
  | ReturnType<typeof feedOrdersWsConnecting>
  | ReturnType<typeof feedOrdersDisconnect>
  | ReturnType<typeof feedOrdersWsOpen>
  | ReturnType<typeof feedOrdersWsClose>
  | ReturnType<typeof feedOrdersWsError>
  | ReturnType<typeof feedOrdersWsMessage>;

export const feedOrdersMiddleware = socketMiddleware({
  wsConnecting: feedOrdersWsConnecting,
  wsConnect: feedOrdersConnect,
  wsDisconnect: feedOrdersDisconnect,
  onOpen: feedOrdersWsOpen,
  onClose: feedOrdersWsClose,
  onError: feedOrdersWsError,
  onMessage: feedOrdersWsMessage,
});
