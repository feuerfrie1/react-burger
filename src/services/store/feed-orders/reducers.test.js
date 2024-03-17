import reducer, { initialState } from "./reducers";

import {
    feedOrdersWsClose,
    feedOrdersWsConnecting,
    feedOrdersWsError,
    feedOrdersWsMessage,
    feedOrdersWsOpen
  } from "./actions";

describe("testing feed-orders reducer", () => {
  const order = {
    _id: "65f40ee197ede0001d060bc2",
    ingredients: [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa093e",
    ],
    status: "done",
    name: "Флюоресцентный люминесцентный бургер",
    createdAt: "2024-03-15T09:03:29.538Z",
    updatedAt: "2024-03-15T09:03:30.196Z",
    number: 36117,
  };

  test("should return initial state", () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  test("should change status to websocket.connecting", () => {
    expect(reducer(undefined, feedOrdersWsConnecting())).toEqual({
      ...initialState,
      status: "WebsocketStatus.CONNECTING",
    });
  });

  test("should change status to websocket.online", () => {
    expect(reducer(undefined, feedOrdersWsOpen())).toEqual({
      ...initialState,
      status: "WebsocketStatus.ONLINE",
    });
  });

  test("should change status to websocket.offline", () => {
    expect(reducer(undefined, feedOrdersWsClose())).toEqual({
      ...initialState,
      status: "WebsocketStatus.OFFLINE",
    });
  });

  test("should change status to error", () => {
    expect(reducer(undefined, feedOrdersWsError("error"))).toEqual({
      ...initialState,
      connectionError: "error",
    });
  });

  test("should change orders total", () => {
    expect(
      reducer(
        undefined,
        feedOrdersWsMessage({
          success: true,
          orders: [order],
          total: 2,
          totalToday: 1,
        })
      )
    ).toEqual({
      ...initialState,
      orders: [order],
      total: 2,
      totalToday: 1,
    });
  });
});
