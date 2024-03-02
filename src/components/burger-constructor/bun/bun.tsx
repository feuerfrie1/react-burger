import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../bun/bun.module.css";
import { selectBun } from "../../../services/store/buger-constructor/reducers";
import { forwardRef } from "react";
import { JSX } from "react";
import { useAppSelector } from "../../../services/store/hooks";

type TBunProps = {
  viewType: "top" | "bottom";
  viewTypeText: string;
};

export const Bun = forwardRef<HTMLDivElement, TBunProps>(
  ({ viewType, viewTypeText }, ref): JSX.Element => {
    const bun = useAppSelector(selectBun);
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
              text={`${bun["name"]} ${bunviewText}`}
              price={bun["price"]}
              thumbnail={bun["image"]}
            />
          </div>
        )}
      </>
    );
  }
);
