import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { fetchIngredients } from "./actions";
import { TIngredient } from "../../../utils/types";

type TInitialState = {
  loading: boolean;
  error: SerializedError | null;
  ingredients: Array<TIngredient>;
};

export const initialState: TInitialState = {
  loading: false,
  error: null,
  ingredients: [],
};

const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      action.payload.data.forEach(
        (ingredient: { type: string; constructorExtraType: string }) => {
          ingredient.type === "bun"
            ? (ingredient.constructorExtraType = "bun")
            : (ingredient.constructorExtraType = "filling");
        }
      );
      state.ingredients = [...action.payload.data];
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
  },
});

const { reducer, selectors } = burgerIngredientsSlice;

export const { selectIngredients } = selectors;

export default reducer;

type TBurgerIngredientsActionCreators = typeof burgerIngredientsSlice.actions;

export type TBurgerIngredientsActions = ReturnType<
  TBurgerIngredientsActionCreators[keyof TBurgerIngredientsActionCreators]
>;
