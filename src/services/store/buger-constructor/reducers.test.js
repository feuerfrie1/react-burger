import reducer, {
  initialState,
  addFilling,
  setBun,
  removeFilling,
  clearConstructorState,
  sortFilling,
} from "./reducers";

describe("check burger-constructor reducer", () => {
  const bun = {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: "80",
    fat: "24",
    carbohydrates: "53",
    calories: "420",
    price: "1255",
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: "0",
    constructorExtraType: "bun",
  };

  const filling = {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: "420",
    fat: "142",
    carbohydrates: "242",
    calories: "4242",
    price: "424",
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: "0",
    constructorId: "ff6888b8-4808-4773-b279-03aadb2e4796",
    constructorExtraType: "filling",
  };

  test("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test("should return setBun state", () => {
    expect(reducer(undefined, setBun(bun))).toEqual({
      ...initialState,
      bun: bun,
    });
  });

  test("should add new filling", () => {
    expect(reducer(undefined, addFilling(filling))).toEqual({
      ...initialState,
      fillings: [...initialState.fillings, filling],
    });
  });

  test("should remove filling", () => {
    expect(
      reducer({ ...initialState, fillings: [1, 2, 3] }, removeFilling(0))
    ).toEqual({
      ...initialState,
      fillings: [2, 3],
    });
  });

  test("should return initialState after clearConstructorState", () => {
    expect(reducer(undefined, clearConstructorState)).toEqual(initialState);
  });

  test("should change ingredients position after sortFilling", () => {
    expect(
      reducer(
        { ...initialState, fillings: ["a", "b", filling] },
        sortFilling({ from: 2, to: 0, item: filling })
      )
    ).toEqual({
      ...initialState,
      fillings: [filling, "a", "b"],
    });
  });
});
