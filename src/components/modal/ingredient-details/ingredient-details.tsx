import styles from "../ingredient-details/ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { selectIngredients } from "../../../services/store/burger-ingredients/reducers";
import { JSX } from "react";
import { TIngredient } from "../../../utils/types";
import { useAppSelector } from "../../../services/store/hooks";

export default function IngredientDetails(): JSX.Element {
  const { id } = useParams();
  const ingredients: Array<TIngredient> = useAppSelector(selectIngredients);
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

  return (
    <section className={styles.ingredientdetails}>
      {ingredient && (
        <>
          <img
            className={styles.ingredientdetails__title}
            src={ingredient.image_large}
            alt={ingredient.name}
          ></img>
          <p
            className={`${styles.ingredientdetails__name} text text_type_main-medium`}
          >
            {ingredient.name}
          </p>
          <div
            className={`${styles.ingredientdetails__information} mt-8 mb-15`}
          >
            <div className={styles.ingredientdetails__information_item}>
              <p className="text text_type_main-default text_color_inactive">
                Калории, ккал
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {ingredient.calories}
              </p>
            </div>
            <div className={styles.ingredientdetails__information_item}>
              <p className="text text_type_main-default text_color_inactive">
                Белки, г
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {ingredient.proteins}
              </p>
            </div>
            <div className={styles.ingredientdetails__information_item}>
              <p className="text text_type_main-default text_color_inactive">
                Жиры, г
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {ingredient.fat}
              </p>
            </div>
            <div className={styles.ingredientdetails__information_item}>
              <p className="text text_type_main-default text_color_inactive">
                Углеводы, г
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {ingredient.carbohydrates}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
