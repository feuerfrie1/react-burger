import styles from "../order-card/order-card.module.css";
import { JSX } from "react";
import { TOrder } from "../../utils/types";
import IngredientsList from "./ingredients-list/ingredients-list";
import { TRANSLATED_STATUS } from "../../utils/constants";
import OrderDetailsItems from "../modal/order-details/order-details-items/order-details-items";

type TProps = {
  order: TOrder;
  view: "details" | "list";
  size?: "medium" | "large";
  container_size?: "default" | "large_container";
};

export default function OrderCard({
  order,
  view,
  size,
  container_size,
}: TProps): JSX.Element {

  const number = () => {
    let orderStr = String(order.number);
    for (let i = orderStr.length; i < 6; i++) {
      orderStr = "0" + orderStr;
    }
    return `#${orderStr}`;
  };

  return (
    <section className={`${styles.ordercard} mb-4`}>
      {view === "list" && (
        <IngredientsList
          order={order}
          number={number()}
          translatedStatus={TRANSLATED_STATUS[order.status]}
          size={size}
          container_size={container_size}
        />
      )}
      {view === "details" && (
        <OrderDetailsItems
          order={order}
          number={number()}
          translatedStatus={TRANSLATED_STATUS[order.status]}
        />
      )}
    </section>
  );
}
