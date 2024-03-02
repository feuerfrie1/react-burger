import styles from "../user-orders/user-orders.module.css";
import { JSX, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { INGREDIENTS_WS_API } from "../../utils/constants";
import {
  profileOrdersConnect,
  profileOrdersDisconnect,
} from "../../services/store/profile-orders/actions";
import OrderList from "../../components/order-list/order-list";
import { selectProfileOrders } from "../../services/store/profile-orders/reducers";

export default function UserOrders(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      profileOrdersConnect(
        `${INGREDIENTS_WS_API}?token=${localStorage
          .getItem("accessToken")!
          .replace("Bearer ", "")}`
      )
    );
    return () => {
      dispatch(profileOrdersDisconnect());
    };
  }, [dispatch]);

  const orders = useAppSelector(selectProfileOrders);

  return (
    <section className={styles.userorders}>
      <OrderList
        orders={orders}
        size="large"
        container_size="large_container"
      />
    </section>
  );
}
