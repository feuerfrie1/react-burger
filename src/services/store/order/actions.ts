import { createAsyncThunk } from "@reduxjs/toolkit";
import { makeRequest } from "../../../utils/ingredients-api";
import { INGREDIENTS_API } from "../../../utils/constants";
import { TOrder } from "../../../utils/types";

type TOrderFromApi = {
  order: TOrder;
};

export const makeOrder = createAsyncThunk(
  "order/makeOrder",
  async (ingredientsIds: Array<string>) =>
    makeRequest<TOrderFromApi>(`${INGREDIENTS_API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: localStorage.getItem("accessToken") || "",
      },
      body: JSON.stringify({
        ingredients: ingredientsIds,
      }),
    })
);
