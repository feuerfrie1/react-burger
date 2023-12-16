import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../bun/bun-top.module.css";
import { selectBun } from "../../../services/store/buger-constructor/reducers";
import { forwardRef } from "react";
import { useSelector } from "react-redux";

export const BunTop = forwardRef(({}, ref) => {
  const bun = useSelector(selectBun);
  return (
    <>
      {bun === null ? (
        <div className={`${styles.clean_top}`} ref={ref}>
          <p className="text text_type_main-default">Выберите булки</p>
        </div>
      ) : (
        <div ref={ref}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
    </>
  );
});
