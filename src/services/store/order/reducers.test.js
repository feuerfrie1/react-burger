import reducer, { initialState } from "./reducers";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { makeOrder } from "./actions";

describe("testing order reducer", () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const order = ["65f40ee197ede0001d060bc2", "65f3843097ede0001d060b76"];

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        success: true,
        order: {
          number: 123,
        },
      }),
      ok: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test("should pending and fulfilled actions after makeOrder", async () => {
    const store = mockStore(initialState);
    await store.dispatch(makeOrder(order));
    const actions = store.getActions();
    expect(actions[0].type).toEqual("order/makeOrder/pending");
    expect(actions[1].type).toEqual("order/makeOrder/fulfilled");
    const state = reducer(initialState, actions[1]);
    expect(state).toEqual({
      ...initialState,
      order: 123,
    });
  });

  test("should pending and rejected actions after errors of makeOrder", async () => {
    const store = mockStore(initialState);
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.reject("error"),
      })
    );
    await store.dispatch(makeOrder(["65f40ee197ede0001d060bc2"]));
    const actions = store.getActions();
    expect(actions[0].type).toEqual("order/makeOrder/pending");
    expect(actions[1].type).toEqual("order/makeOrder/rejected");
  });
});
