import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../bun/bun-bottom.module.css";
import { selectBun } from "../../../services/store/buger-constructor/reducers";
import { forwardRef } from "react";
import { useSelector } from "react-redux";

export const BunBottom = forwardRef(({}, ref) => {
  const bun = useSelector(selectBun);

  return (
    <>
      {bun === null ? (
        <div className={`${styles.clean_bottom}`} ref={ref}>
          <p className="text text_type_main-default">Выберите булки</p>
        </div>
      ) : (
        <div ref={ref}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            key={bun._id}
          />
        </div>
      )}
    </>
  );
});
