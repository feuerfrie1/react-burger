import styles from "../burger-ingridients/burger-ingredients.module.css";
import React from "react";
import { useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { ingredientsPropTypes } from "../../utils/ingredients-prop-types";
import { useDrag } from "react-dnd";

export default function BurgerIngredientsCard({ ingredient, count }) {
  const [isModalActive, setModalActive] = useState(false);
  function toggleModal() {
    setModalActive(!isModalActive);
  }

  const [, dragRef] = useDrag({
    type: ingredient.constructorExtraType,
    item: ingredient,
  });

  return (
    <section>
      <div onClick={toggleModal} className={styles.ingredients__cards_card}>
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
      </div>
      {isModalActive && (
        <Modal
          className="text text_type_main-medium mt-4 mb-8"
          title="Детали ингредиента"
          onClose={toggleModal}
        >
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredientsCard.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
  count: ingredientsPropTypes,
};
