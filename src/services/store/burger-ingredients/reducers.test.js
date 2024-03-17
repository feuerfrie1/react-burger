import reducer, { initialState } from "./reducers";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { fetchIngredients } from "./actions";

describe("testing burger-ingredients reducer", () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        success: true,
        data: [
          {
            _id: "643d69a5c3f7b9001cfa093c",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: "80",
            fat: "24",
            carbohydrates: "53",
            calories: "420",
            price: "1255",
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: "0",
          },
          {
            _id: "643d69a5c3f7b9001cfa0941",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: "420",
            fat: "142",
            carbohydrates: "242",
            calories: "4242",
            price: "424",
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/meat-01-large.png",
            __v: "0",
          },
        ],
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

  test("should pending and fulfilled actions after fetchIngredients", async () => {
    const store = mockStore(initialState);
    await store.dispatch(fetchIngredients());
    const actions = store.getActions();
    expect(actions[0].type).toEqual(
      "burger-ingredients/fetchIngredients/pending"
    );
    expect(actions[1].type).toEqual(
      "burger-ingredients/fetchIngredients/fulfilled"
    );
    const state = reducer(initialState, actions[1]);

    expect(state).toEqual({
      ...initialState,
      ingredients: [
        {
          _id: "643d69a5c3f7b9001cfa093c",
          name: "Краторная булка N-200i",
          type: "bun",
          proteins: "80",
          fat: "24",
          carbohydrates: "53",
          calories: "420",
          price: "1255",
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
          __v: "0",
          constructorExtraType: "bun",
        },
        {
          _id: "643d69a5c3f7b9001cfa0941",
          name: "Биокотлета из марсианской Магнолии",
          type: "main",
          proteins: "420",
          fat: "142",
          carbohydrates: "242",
          calories: "4242",
          price: "424",
          image: "https://code.s3.yandex.net/react/code/meat-01.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
          image_large:
            "https://code.s3.yandex.net/react/code/meat-01-large.png",
          __v: "0",
          constructorExtraType: "filling",
        },
      ],
    });
  });

  test("should pending and rejected actions after errors of fetchIngredients", async () => {
    const store = mockStore(initialState);
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.reject("error"),
      })
    );
    await store.dispatch(fetchIngredients());
    const actions = store.getActions();
    expect(actions[0].type).toEqual(
      "burger-ingredients/fetchIngredients/pending"
    );
    expect(actions[1].type).toEqual(
      "burger-ingredients/fetchIngredients/rejected"
    );
  });
});
