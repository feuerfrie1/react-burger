import type { Middleware } from "redux";

import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { refreshToken } from "../../../utils/ingredients-api";

export type TWsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (
  wsActions: TWsActionTypes,
  withTokenRefresh: boolean = false
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";
    const {
      wsConnect,
      wsDisconnect,
      wsSendMessage,
      wsConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
    } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;
      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload);
        url = action.payload;
        isConnected = true;
        dispatch(wsConnecting());

        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError("Error"));
        };

        socket.onclose = () => {
          dispatch(onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, RECONNECT_PERIOD);
          }
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (
            withTokenRefresh &&
            parsedData.message === "Invalid or missing token"
          ) {
            refreshToken()
              .then((refreshData) => {
                const wssUrl = new URL(url);
                wssUrl.searchParams.set(
                  "token",
                  refreshData.accessToken.replace("Bearer ", "")
                );
                dispatch(wsConnect(wssUrl.toString()));
              })
              .catch((err) => {
                dispatch(onError(err.message));
              });

            dispatch(wsDisconnect());

            return;
          }
          dispatch(onMessage(parsedData));
        };
      }

      if (socket && wsSendMessage?.match(action)) {
        socket.send(JSON.stringify(action.payload));
      }

      if (socket && wsDisconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};
