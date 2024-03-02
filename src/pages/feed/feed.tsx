import styles from "../feed/feed.module.css";
import { JSX, useEffect, useMemo } from "react";
import OrderList from "../../components/order-list/order-list";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import {
  feedOrdersConnect,
  feedOrdersDisconnect,
} from "../../services/store/feed-orders/actions";
import { INGREDIENTS_WS_API } from "../../utils/constants";
import {
  selectFeedOrders,
  selectTotal,
  selectTotalToday,
} from "../../services/store/feed-orders/reducers";

export default function Feed(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(feedOrdersConnect(`${INGREDIENTS_WS_API}/all`));
    return () => {
      dispatch(feedOrdersDisconnect());
    };
  }, [dispatch]);

  const orders = useAppSelector(selectFeedOrders);
  const total = useAppSelector(selectTotal);
  const totalToday = useAppSelector(selectTotalToday);

  const doneOrders = useMemo(
    () => orders.filter((order) => order.status === "done"),
    [orders]
  );
  doneOrders.splice(10);

  const pendingOrders = useMemo(
    () => orders.filter((order) => order.status === "pending"),
    [orders]
  );
  pendingOrders.splice(10);

  return (
    <section className={styles.feed}>
      <main className={styles.feed__main}>
        <h1 className="text text_type_main-large mt-5 mb-5">Лента заказов</h1>
        <OrderList orders={orders} />
        <div className={styles.feed__stats}>
          <div className={`${styles.feed__stats_board} mb-15`}>
            <div>
              <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
              <div className={styles.feed__stats_board_done}>
                {doneOrders &&
                  doneOrders.map((order) => (
                    <div key={order._id}>
                      <p
                        className={`${styles.feed__stats_number} text text_type_digits-default mb-2`}
                      >
                        {order.number}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h2
                className={`${styles.feed__stats_inwork_title} text text_type_main-medium mb-6`}
              >
                В работе:
              </h2>
              <div className={styles.feed__stats_board_inwork}>
                {pendingOrders &&
                  pendingOrders.map((order) => (
                    <div key={order._id}>
                      <p
                        className={`${styles.feed__stats_number_inwork} text text_type_digits-default mb-2`}
                      >
                        {order.number}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="mb-15">
            <h2 className="text text_type_main-medium">
              Выполнено за все время:
            </h2>
            <p
              className={`${styles.feed__stats_number_alltime} text text_type_digits-large`}
            >
              {total}
            </p>
          </div>
          <div>
            <h2 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h2>
            <p
              className={`${styles.feed__stats_number_alltime} text text_type_digits-large`}
            >
              {totalToday}
            </p>
          </div>
        </div>
      </main>
    </section>
  );
}
