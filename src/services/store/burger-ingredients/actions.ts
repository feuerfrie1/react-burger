import { createAsyncThunk } from "@reduxjs/toolkit";
import { makeRequest } from "../../../utils/ingredients-api";
import { INGREDIENTS_API } from "../../../utils/constants";
import { TIngredient } from "../../../utils/types";

type TIngredients = {
  data: Array<TIngredient>;
};

export const fetchIngredients = createAsyncThunk(
  "burger-ingredients/fetchIngredients",
  async () => makeRequest<TIngredients>(`${INGREDIENTS_API}/ingredients`)
);
