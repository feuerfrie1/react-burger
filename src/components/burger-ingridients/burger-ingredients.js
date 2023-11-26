import React from 'react';
import styles from '../burger-ingridients/burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCard from './burger-ingredients-card';
import { ingredientsPropTypes } from '../../utils/ingredients-prop-types';

function BurgerIngredients ({ingredients}) {
    const [current, setCurrent] = React.useState('one');
    const bun = React.useMemo(
        () => ingredients.filter((item) => item.type === 'bun'),
        [ingredients]
      );

    const sauce = React.useMemo(
        () => ingredients.filter((item) => item.type === 'sauce'),
        [ingredients]
      );

    const main = React.useMemo(
        () => ingredients.filter((item) => item.type === 'main'),
        [ingredients]
      );

    return (
        <div>
            <h2 className="text text_type_main-large mt-5 mb-3">Соберите бургер</h2>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки</Tab>
            </div>
            <section className={`${styles.ingredients__cards} custom-scroll`}>
                <h2 className="text text_type_main-medium mt-5">Булки</h2>
                <div className={styles.ingredients__cards_list}>
                    {bun.map((item) => {
                    return <BurgerIngredientsCard ingredients={item}/>;
                    })}
                </div>
                <h2 className="text text_type_main-medium mt-5">Соусы</h2>
                <div className={styles.ingredients__cards_list}>
                    {sauce.map((item) => {
                    return <BurgerIngredientsCard ingredients={item}/>;
                    })}
                </div>
                <h2 className="text text_type_main-medium mt-5">Начинки</h2>
                <div className={styles.ingredients__cards_list}>
                    {main.map((item) => {
                    return <BurgerIngredientsCard ingredients={item}/>;
                    })}
                </div>
            </section>
        </div>
    )
}

BurgerIngredients.propTypes = {
    ingredients: ingredientsPropTypes.isRequired,
  };
  
export default BurgerIngredients; 