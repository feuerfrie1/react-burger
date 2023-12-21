import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: null,
};

const currentIngredientDetailsSlice = createSlice({
  name: "currentIngredient",
  initialState: initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.ingredient = action.payload;
    },
  },
  selectors: {
    selectCurrentIngredient: (state) => state.ingredient,
  },
});

const { actions, reducer, selectors } = currentIngredientDetailsSlice;

export const { setCurrentIngredient } = actions;

export const { selectCurrentIngredient } = selectors;

export default reducer;
