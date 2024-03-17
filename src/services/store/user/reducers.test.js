import reducer, { initialState } from "./reducers";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { login, register, getUser, editUser, logout } from "./actions";

describe("testing user reducer", () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test("should pending and fulfilled actions after login", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        success: true,
        user: {
          name: "Qwer",
          email: "email",
        },
      }),
      ok: true,
    });

    const store = mockStore(initialState);
    await store.dispatch(login({ email: "email", password: "password" }));
    const actions = store.getActions();

    expect(actions[0].type).toEqual("user/login/pending");
    expect(actions[1].type).toEqual("user/login/fulfilled");

    const state = reducer(initialState, actions[1]);

    expect(state).toEqual({
      ...initialState,
      user: {
        name: "Qwer",
        email: "email",
      },
      isAuthChecked: true,
    });
  });

  test("should pending and fulfilled actions after register", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        success: true,
        user: {
          name: "Qwer",
          email: "email",
        },
      }),
      ok: true,
    });

    const store = mockStore(initialState);
    await store.dispatch(register({ email: "email", password: "password" }));
    const actions = store.getActions();

    expect(actions[0].type).toEqual("user/register/pending");
    expect(actions[1].type).toEqual("user/register/fulfilled");

    const state = reducer(initialState, actions[1]);

    expect(state).toEqual({
      ...initialState,
      user: {
        name: "Qwer",
        email: "email",
      },
      isAuthChecked: true,
    });
  });

  test("should pending and fulfilled actions after getUser", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        success: true,
        user: {
          name: "Qwer",
          email: "email",
        },
      }),
      ok: true,
    });

    const store = mockStore(initialState);
    await store.dispatch(getUser());
    const actions = store.getActions();

    expect(actions[0].type).toEqual("user/getUser/pending");
    expect(actions[1].type).toEqual("user/getUser/fulfilled");

    const state = reducer(initialState, actions[1]);

    expect(state).toEqual({
      ...initialState,
      user: {
        name: "Qwer",
        email: "email",
      },
      isAuthChecked: true,
    });
  });

  test("should pending and fulfilled actions editUser", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        success: true,
        user: {
          name: "Qwer",
          email: "email",
        },
      }),
      ok: true,
    });

    const store = mockStore(initialState);

    await store.dispatch(editUser());

    const actions = store.getActions();

    expect(actions[0].type).toEqual("user/patchUser/pending");
    expect(actions[1].type).toEqual("user/patchUser/fulfilled");

    const state = reducer(initialState, actions[1]);

    expect(state).toEqual({
      ...initialState,
      user: {
        name: "Qwer",
        email: "email",
      },
    });
  });

  test("should pending and fulfilled actions after logout", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        success: true,
      }),
      ok: true,
    });

    const store = mockStore(initialState);
    await store.dispatch(logout());
    const actions = store.getActions();

    expect(actions[0].type).toEqual("user/logout/pending");
    expect(actions[1].type).toEqual("user/logout/fulfilled");

    const state = reducer(initialState, actions[1]);

    expect(state).toEqual({
      ...initialState,
      user: null,
    });
  });
});
