import styles from "../order-details-items/order-details-items.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { JSX, useEffect, useState } from "react";
import { TIngredient, TMonoTypeObject, TOrder } from "../../../../utils/types";
import { selectIngredients } from "../../../../services/store/burger-ingredients/reducers";
import { useAppSelector } from "../../../../services/store/hooks";

type TProps = {
  order: TOrder;
  number: string;
  translatedStatus: string;
};

export default function OrderDetailsItems({
  order,
  number,
  translatedStatus,
}: TProps): JSX.Element {
  const ingredientsStore: Array<TIngredient> =
    useAppSelector(selectIngredients);

  const [orderIngredients, setOrderIngredients] = useState<Array<TIngredient>>(
    []
  );
  const [orderPrice, setOrderPrice] = useState<number>(0);
  const [itemsCount, setItemsCount] = useState<TMonoTypeObject<number> | null>(
    null
  );

  useEffect(() => {
    const ingredients: Array<TIngredient> = [];
    const itemsCount = order.ingredients.reduce(
      (acc: TMonoTypeObject<number>, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
      },
      {}
    );
    let price = 0;
    Object.keys(itemsCount).forEach((ingredientId) => {
      const ingredientForAdd = ingredientsStore.find(
        (ingredient) => ingredient._id === ingredientId
      )!;
      price += +ingredientForAdd.price;
      ingredients.push(ingredientForAdd);
    });
    setOrderIngredients([...ingredients]);
    setOrderPrice(price);
    setItemsCount(itemsCount);
  }, [order, ingredientsStore]);

  return (
    <section className={styles.orderdetailsitems}>
      <p
        className={`${styles.orderdetailsitems__ordername} text text_type_digits-default mb-10`}
      >
        {number}
      </p>
      <h3 className="text text_type_main-medium mb-3">{order.name}</h3>
      <p className={`${styles[order.status]} text text_type_main-small mb-15`}>
        {translatedStatus}
      </p>
      <h3 className="text text_type_main-medium mb-6">Состав:</h3>
      <div
        className={`${styles.orderdetailsitems__container} mb-10 custom-scroll`}
      >
        {orderIngredients.map((ingredient) => {
          return (
            <div
              key={ingredient._id}
              className={`${styles.orderdetailsitems__item} mb-4 mr-6`}
            >
              <div className={`${styles.orderdetailsitems__item_icons}`}>
                <div
                  className={`${styles.orderdetailsitems__item_image} mr-4`}
                  style={{ backgroundImage: `url(${ingredient.image_mobile})` }}
                />
                <p className="text text_type_main-small">{ingredient.name}</p>
              </div>
              <div className={`${styles.orderdetailsitems__item_price}`}>
                <p className="text text_type_digits-default mr-1">
                  {itemsCount &&
                    itemsCount[ingredient._id] + " x " + ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.orderdetailsitems__total}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.updatedAt)} />
        </p>
        <div className={styles.orderdetailsitems__total_price}>
          <p className="text text_type_digits-default mr-2">{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}
