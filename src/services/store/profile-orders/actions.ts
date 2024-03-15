import { createAction } from "@reduxjs/toolkit";
import { socketMiddleware } from "../middleware/socket-middleware";
import { TOrder } from "../../../utils/types";

type TPayload = {
  success: boolean;
  orders: Array<TOrder>;
};
export const profileOrdersConnect = createAction<
  string,
  "PROFILE_ORDERS_CONNECT"
>("PROFILE_ORDERS_CONNECT");
export const profileOrdersDisconnect = createAction(
  "PROFILE_ORDERS_DISCONNECT"
);
export const profileOrdersWsConnecting = createAction(
  "PROFILE_ORDERS_WS_CONNECTING"
);
export const profileOrdersWsOpen = createAction("PROFILE_ORDERS_WS_OPEN");
export const profileOrdersWsClose = createAction("PROFILE_ORDERS_WS_CLOSE");
export const profileOrdersWsError = createAction<
  string,
  "PROFILE_ORDERS_WS_ERROR"
>("PROFILE_ORDERS_WS_ERROR");
export const profileOrdersWsMessage = createAction<
  TPayload,
  "PROFILE_ORDERS_WS_MESSAGE"
>("PROFILE_ORDERS_WS_MESSAGE");

export type TProfileOrdersActions =
  | ReturnType<typeof profileOrdersConnect>
  | ReturnType<typeof profileOrdersDisconnect>
  | ReturnType<typeof profileOrdersWsConnecting>
  | ReturnType<typeof profileOrdersWsError>
  | ReturnType<typeof profileOrdersWsOpen>
  | ReturnType<typeof profileOrdersWsClose>
  | ReturnType<typeof profileOrdersWsMessage>;

export const profileOrdersMiddleware = socketMiddleware({
  wsConnect: profileOrdersConnect,
  wsDisconnect: profileOrdersDisconnect,
  wsConnecting: profileOrdersWsConnecting,
  onOpen: profileOrdersWsOpen,
  onError: profileOrdersWsError,
  onClose: profileOrdersWsClose,
  onMessage: profileOrdersWsMessage,
});
