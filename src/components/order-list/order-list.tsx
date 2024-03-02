import styles from "../order-list/order-list.module.css";
import { JSX } from "react";
import OrderCard from "../order-card/order-card";
import { TOrder } from "../../utils/types";

type TProps = {
  orders: Array<TOrder>;
  size?: "medium" | "large";
  container_size?: "default" | "large_container";
};

export default function OrderList({
  orders,
  size,
  container_size,
}: TProps): JSX.Element {
  
  return (
    <section className={`${styles.orderlist} custom-scroll`}>
      {orders &&
        orders.map((order) => {
          return (
            <OrderCard
              order={order}
              key={order._id}
              view="list"
              size={size}
              container_size={container_size}
            />
          );
        })}
    </section>
  );
}
