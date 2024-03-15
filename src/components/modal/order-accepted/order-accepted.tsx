import styles from "../order-accepted/order-accepted.module.css";
import doneIcon from "../../../images/done.png";
import { selectOrderNumber } from "../../../services/store/order/reducers";
import { JSX } from "react";
import { useAppSelector } from "../../../services/store/hooks";

export default function OrderAccepted(): JSX.Element {
  const number = useAppSelector(selectOrderNumber);

  return (
    <section className={styles.orderdetails} data-test-order-number={number}>
      <h2
        className={`${styles.orderdetails__title} text text_type_digits-large`}
      >
        {number}
      </h2>
      <p
        className={`${styles.orderdetails__text} text text_type_main-medium mt-8`}
      >
        идентификатор заказа
      </p>
      <img className="mt-15" src={doneIcon} alt="done"></img>
      <p
        className={`${styles.orderdetails__text} text text_type_main-default mt-15`}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.orderdetails__text} text text_type_main-default text_color_inactive mt-2 mb-30`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
}
