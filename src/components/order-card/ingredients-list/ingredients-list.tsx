import styles from "../ingredients-list/ingredients-list.module.css";
import { JSX, useEffect, useState } from "react";
import { TIngredient, TOrder } from "../../../utils/types";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../services/store/hooks";
import { selectIngredients } from "../../../services/store/burger-ingredients/reducers";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

type TProps = {
  order: TOrder;
  number: string;
  translatedStatus: string;
  size?: "medium" | "large";
  container_size?: "default" | "large_container";
};

export default function IngredientsList({
  order,
  number,
  size = "medium",
  container_size = "default",
}: TProps): JSX.Element {

  const location = useLocation();
  const ingredientStore: Array<TIngredient> = useAppSelector(selectIngredients);
  const [orderIngredients, setOrderIngredients] = useState<Array<TIngredient>>(
    []
  );
  const [ingredientsCount, setIngredientsCount] = useState<number>(0);
  const [orderPrice, setOrderPrice] = useState<number>(0);

  useEffect(() => {
    const ingredients: Array<TIngredient> = [];
    let count = 0;
    let price = 0;
    order.ingredients.forEach((ingredientId) => {
      const ingredientForAdd = ingredientStore.find(
        (ingredient) => ingredient._id === ingredientId
      )!;
      price += +ingredientForAdd.price;
      if (ingredients.length <= 5) {
        ingredients.push(ingredientForAdd);
      } else {
        count += 1;
      }
    });
    setOrderIngredients([...ingredients]);
    setIngredientsCount(count);
    setOrderPrice(price);
  }, [order, ingredientStore]);

  return (
    <Link
      to={`${location.pathname}/${order.number}`}
      state={{ background: location }}
      className={styles.link}
    >
      <section className={`${styles.ingredients__list} ${styles[size]}`}>
        <div
          className={`${styles.ingredients__list_container} ${styles[container_size]} mb-6`}
        >
          <div className={`${styles.ingredients__list_title} mt-6`}>
            <p className="text text_type_digits-default">{number}</p>
            <p className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(order.updatedAt)} />
            </p>
          </div>
          <h2 className="text text_type_main-medium mb-6 mt-6">{order.name}</h2>
          <div className={`${styles.ingredients__list_images_and_price}`}>
            <div className={`${styles.ingredients__list_images}`}>
              {orderIngredients.map(
                (ingredient: TIngredient, index: number) => {
                  const style = {
                    backgroundImage: `url(${ingredient.image_mobile})`,
                    transform: `translate(${-10 * index}px)`,
                  };
                  return (
                    <div
                      key={index}
                      className={styles.ingredients__list_image}
                      style={style}
                    />
                  );
                }
              )}
              {ingredientsCount !== 0 && (
                <div
                  className={styles.ingredients__list_extraimage}
                  style={{
                    transform: `translate(${
                      -10 * orderIngredients.length - 54
                    }px)`,
                  }}
                >
                  <p className="text text_type_main-small">
                    +{ingredientsCount}
                  </p>
                </div>
              )}
            </div>
            <div className={styles.ingredients__list_price}>
              <p className="text text_type_digits-default mr-1">{orderPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}
