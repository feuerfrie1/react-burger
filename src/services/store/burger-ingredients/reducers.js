import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "./actions";

const initialState = {
  loading: false,
  error: false,
  ingredients: [],
};

const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      action.payload.data.forEach((ingredient) => {
        ingredient.type === "bun"
          ? (ingredient.constructorExtraType = "bun")
          : (ingredient.constructorExtraType = "filling");
      });
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
