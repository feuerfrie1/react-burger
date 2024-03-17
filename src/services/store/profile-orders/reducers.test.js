import reducer, { initialState } from "./reducers";
import {
  profileOrdersWsClose,
  profileOrdersWsConnecting,
  profileOrdersWsError,
  profileOrdersWsMessage,
  profileOrdersWsOpen,
} from "./actions";

describe("testing profile-orders reducer", () => {
  const orders = [
    {
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
    },
    {
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
      number: 36118,
    },
  ];

  const reverseOrders = orders.reverse();

  test("should return initial state", () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  test("should change status to websocket.connecting", () => {
    expect(reducer(undefined, profileOrdersWsConnecting())).toEqual({
      ...initialState,
      status: "WebsocketStatus.CONNECTING",
    });
  });

  test("should change status to websocket.online", () => {
    expect(reducer(undefined, profileOrdersWsOpen())).toEqual({
      ...initialState,
      status: "WebsocketStatus.ONLINE",
    });
  });

  test("should change status to websocket.offline", () => {
    expect(reducer(undefined, profileOrdersWsClose())).toEqual({
      ...initialState,
      status: "WebsocketStatus.OFFLINE",
    });
  });

  test("should change status to error", () => {
    expect(reducer(undefined, profileOrdersWsError("error"))).toEqual({
      ...initialState,
      connectionError: "error",
    });
  });

  test("should change orders total", () => {
    expect(
      reducer(
        undefined,
        profileOrdersWsMessage({ success: true, orders: orders })
      )
    ).toEqual({
      ...initialState,
      orders: reverseOrders,
    });
  });
});
