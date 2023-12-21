import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../bun/bun.module.css";
import { selectBun } from "../../../services/store/buger-constructor/reducers";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export const Bun = forwardRef(({ viewType, viewTypeText }, ref) => {
  const bun = useSelector(selectBun);
  const bunView = viewType === "top" ? styles.clean_top : styles.clean_bottom;
  const bunviewText = viewTypeText === "top" ? "(верх)" : "(низ)";
  return (
    <>
      {bun === null ? (
        <div className={`${styles.clean} ${bunView}`} ref={ref}>
          <p className="text text_type_main-default">Выберите булки</p>
        </div>
      ) : (
        <div ref={ref}>
          <ConstructorElement
            type={viewType}
            isLocked={true}
            text={`${bun.name} ${bunviewText}`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
    </>
  );
});

Bun.propTypes = {
  viewType: PropTypes.string.isRequired,
  viewTypeText: PropTypes.string.isRequired,
};
