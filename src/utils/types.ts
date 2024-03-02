export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  constructorExtraType: "bun" | "filling";
};

export type TFillingIngredient = TIngredient & {
  constructorId?: number;
};

export type TIngredients = Pick<TIngredient, "constructorExtraType">;

export type TMonoTypeObject<T> = {
  [name: string]: T;
};

export type TUser = {
  name: string;
  email: string;
  password?: string;
};

export type TOrder = {
  ingredients: Array<string>;
  _id: string;
  status: "pending" | "done" | "created" | "cancelled";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};
