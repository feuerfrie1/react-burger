import React from 'react';
import { useState } from "react";
import styles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorCard from './burger-constructor-card';
import Modal from '../modal/modal';
import OrderDetails from '../modal/order-details/order-details';
import { ingredientsPropTypes } from '../../utils/ingredients-prop-types';

function BurgerConstructor ({ingredients}) {
  const [isModalActive, setModalActive] = useState(false);
 
  function toggleModal() {
    setModalActive(!isModalActive);
  }
  
  const bun = React.useMemo(
    () => ingredients.filter((item) => item._id === '643d69a5c3f7b9001cfa093c'),
    [ingredients]
  );

   return (
        <section>
        <div className={`${styles.burger__constructor_elements} mt-25 mb-10`}>
        <div className={`${styles.burger__constructor_element} ml-6`}>
        {bun.map((item) => {
        return <ConstructorElement
        type="top"
        isLocked={true}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    })}
      </div>
      <div className={`${styles.burger__constructor_components} custom-scroll`}>
      {ingredients.map((item) => {
      return <BurgerConstructorCard ingredients={item} />
    })}
      </div>
      <div className={`${styles.burger__constructor_element} ml-6`}>
      {bun.map((item) => {
        return <ConstructorElement
        type="bottom"
        isLocked={true}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    })}
      </div>
    </div>
    <div className={styles.burger__constructor_order}>
        <div className={`${styles.burger__constructor_total} mr-10`}>
    <p className='text text_type_digits-medium mr-3'>610</p>
    <CurrencyIcon type="primary" />
    </div>
    <Button onClick={toggleModal} htmlType="button" type="primary" size="large">Оформить заказ</Button>
    </div>
    <div>
        {isModalActive && (
          <Modal onClose={toggleModal}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </section>
    )
    
}

BurgerConstructor.propTypes = {
  ingredients: ingredientsPropTypes.isRequired,
};
  
export default BurgerConstructor;