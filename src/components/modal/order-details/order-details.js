import styles from "../order-details/order-details.module.css";
import doneIcon from "../../../images/done.png";
import { useSelector } from "react-redux";
import { selectOrderNumber } from "../../../services/store/order/reducers";

export default function OrderDetails() {

  const number = useSelector(selectOrderNumber);

  return (
    <section className={styles.orderdetails}>
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
