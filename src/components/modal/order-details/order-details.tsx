import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { INGREDIENTS_API } from "../../../utils/constants";
import { makeRequest } from "../../../utils/ingredients-api";
import { TOrder } from "../../../utils/types";
import OrderCard from "../../order-card/order-card";

type TResponse = {
  success: boolean;
  orders: Array<TOrder>;
};

export default function OrderDetails(): JSX.Element {
  const { id } = useParams();

  const [order, setOrder] = useState<TOrder | null>(null);

  useEffect(() => {
    makeRequest<TResponse>(`${INGREDIENTS_API}/orders/${id}`).then((res) => {
      setOrder(res.orders[0]);
    });
  }, [id]);

  return <>{order && <OrderCard order={order} view="details" />}</>;
}
