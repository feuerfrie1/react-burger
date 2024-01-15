import styles from "../burger-ingridients/burger-ingredients.module.css";
import { useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientsPropTypes } from "../../utils/ingredients-prop-types";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function BurgerIngredientsCard({ ingredient, count }) {
  const [isModalActive, setModalActive] = useState(false);
  function toggleModal() {
    setModalActive(!isModalActive);
  }

  const [, dragRef] = useDrag({
    type: ingredient.constructorExtraType,
    item: ingredient,
  });

  const location = useLocation();

  return (
    <section>
      <div onClick={toggleModal} className={styles.ingredients__cards_card}>
        <Link
          to={`/ingredients/${ingredient._id}`}
          key={ingredient._id}
          state={{ background: location }}
          className={styles.ingredients__cards_link}
        >
          <img
            className={styles.image}
            src={ingredient.image}
            alt={ingredient.name}
            type={ingredient.bun}
            ref={dragRef}
          />
          <div className={styles.ingredients__price}>
            <p className="text text_type_digits-default m-1">
              {ingredient.price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <p
            className={`${styles.ingredients__card_title} text text_type_main-small`}
          >
            {ingredient.name}
          </p>
          {count && <Counter count={count} size="default" />}
        </Link>
      </div>
    </section>
  );
}

BurgerIngredientsCard.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
  count: PropTypes.number,
};
