import { ThunkDispatch } from "@reduxjs/toolkit";
import { TOrderActions } from "./order/reducers";
import { TUserActions } from "./user/reducers";
import { TBurgerConstructorActions } from "../../services/store/buger-constructor/reducers";
import { TBurgerIngredientsActions } from "../store/burger-ingredients/reducers";
import store from ".";
import { TFeedOrdersActions } from "./feed-orders/actions";
import { TProfileOrdersActions } from "./profile-orders/actions";

export type TAppActions =
  | TOrderActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TUserActions
  | TFeedOrdersActions
  | TProfileOrdersActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, any, TAppActions>;
