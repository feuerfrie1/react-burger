import styles from '../burger-ingridients/burger-ingredients.module.css';
import React from 'react';
import { useState } from "react";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import { ingredientsPropTypes } from '../../utils/ingredients-prop-types';

export default function BurgerIngredientsCard ({ingredients}) {
    const [isModalActive, setModalActive] = useState(false);
    function toggleModal() {
    setModalActive(!isModalActive);
  }
    
    return (
    <div onClick={toggleModal} className={styles.ingredients__cards_card}>
        <img className={styles.image} src={ingredients.image} alt={ingredients.name} type={ingredients.bun}/>
        <div className={styles.ingredients__price}>
            <p className="text text_type_digits-default m-1">{ingredients.price}</p>
            <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.ingredients__card_title} text text_type_main-small`}>{ingredients.name}</p>
        <Counter count={1} size="default" extraClass="m-1" />
        {isModalActive && (
          <Modal className="text text_type_main-medium mt-4 mb-8" title="Детали ингредиента" onClose={toggleModal}>
            <IngredientDetails ingredients={ingredients} />
          </Modal>
        )}
    </div>
    )
}

BurgerIngredientsCard.propTypes = {
    ingredients: ingredientsPropTypes.isRequired,
  };