import styles from "../burger-ingridients/burger-ingredients.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientsPropTypes } from "../../utils/ingredients-prop-types";

export default function BurgerConstructorCard({ ingredient }) {
  return (
    <div className={styles.burger__constructor_element}>
      <DragIcon />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  );
}

BurgerConstructorCard.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
};
