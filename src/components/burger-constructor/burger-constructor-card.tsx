import styles from "../burger-ingridients/burger-ingredients.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { JSX } from "react";
import { TIngredient } from "../../utils/types";

type TBurgerConstructorCardProps = {
  ingredient: TIngredient;
};

export default function BurgerConstructorCard({
  ingredient,
}: TBurgerConstructorCardProps): JSX.Element {
  return (
    <div className={styles.burger__constructor_element}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  );
}
