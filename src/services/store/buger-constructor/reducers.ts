import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient, TFillingIngredient } from "../../../utils/types";

type TInitialState = {
  bun: TIngredient | null;
  fillings: Array<TFillingIngredient>;
};

type TSortFillingActionPayload = {
  from: number;
  to: number;
  item: TFillingIngredient;
};

export const initialState: TInitialState = {
  bun: null,
  fillings: [],
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState: initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addFilling: (state, action: PayloadAction<TFillingIngredient>) => {
      const fillingItem = { ...action.payload };
      state.fillings.push(fillingItem);
    },
    removeFilling: (state, action) => {
      state.fillings.splice(action.payload, 1);
    },
    clearConstructorState: (state) => {
      state.bun = null;
      state.fillings = [];
    },
    sortFilling: (state, action: PayloadAction<TSortFillingActionPayload>) => {
      state.fillings.splice(action.payload.from, 1);
      state.fillings.splice(action.payload.to, 0, action.payload.item);
    },
  },
  selectors: {
    selectBun: (state) => state.bun,
    selectFillings: (state) => state.fillings,
  },
});

const { reducer, selectors, actions } = burgerConstructorSlice;

export const {
  setBun,
  addFilling,
  removeFilling,
  clearConstructorState,
  sortFilling,
} = actions;
export const { selectBun, selectFillings } = selectors;
export default reducer;

type TBurgerConstructorActionCreators = typeof burgerConstructorSlice.actions;

export type TBurgerConstructorActions = ReturnType<
  TBurgerConstructorActionCreators[keyof TBurgerConstructorActionCreators]
>;
