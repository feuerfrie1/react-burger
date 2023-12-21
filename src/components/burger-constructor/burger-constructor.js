import { useMemo, useCallback } from "react";
import styles from "../burger-constructor/burger-constructor.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setBun } from "../../services/store/buger-constructor/reducers";
import { Bun } from "./bun/bun"
import { Fillings } from "./fillings/fillings";
import { FillingsCard } from "./fillings-card/fillings-card";
import {
  selectBun,
  selectFilling,
  clearConstructorState,
} from "../../services/store/buger-constructor/reducers";
import { makeOrder } from "../../services/store/order/actions";
import {
  clearOrder,
  selectOrderNumber,
} from "../../services/store/order/reducers";

function BurgerConstructor() {
  const dispatch = useDispatch();

  const bun = useSelector(selectBun);
  const filling = useSelector(selectFilling);

  function bunDrop(ingredient) {
    dispatch(setBun(ingredient));
  }

  const [, topBunDropTarget] = useDrop({
    accept: "bun",
    drop(ingredient) {
      bunDrop(ingredient);
    },
  });

  const [, bottomBunDropTarget] = useDrop({
    accept: "bun",
    drop(ingredient) {
      bunDrop(ingredient);
    },
  });

  const totalPrice = useMemo(() => {
    let result = 0;
    bun && (result += bun.price * 2);
    filling.length !== 0 &&
      (result += filling.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
      ));
    return result;
  }, [bun, filling]);

  const orderButtonHandler = useCallback(() => {
    if (bun === null || filling.length === 0) return;
    const ingredients = [bun, ...filling, bun];
    const ids = ingredients.map((item) => item._id);
    dispatch(makeOrder(ids));
  }, [dispatch, filling]);

  const orderNumber = useSelector(selectOrderNumber);

  const onCloseModal = useCallback(() => {
    dispatch(clearOrder());
    dispatch(clearConstructorState());
  }, [dispatch]);

  return (
    <section>
      <div className={`${styles.burger__constructor_elements} mt-25 mb-10`}>
        <Bun viewType="top" ref={topBunDropTarget} viewTypeText="top" />
        <Fillings>
          <FillingsCard />
        </Fillings>
        <Bun viewType="bottom" ref={bottomBunDropTarget} viewTypeText="bottom" />
      </div>
      <div className={styles.burger__constructor_order}>
        <div className={`${styles.burger__constructor_total} mr-10`}>
          <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={orderButtonHandler}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      <div>
        {orderNumber && (
          <Modal onClose={onCloseModal}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </section>
  );
}

export default BurgerConstructor;
