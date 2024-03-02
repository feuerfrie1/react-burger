import styles from "../fillings/fillings.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilling,
  selectFillings,
} from "../../../services/store/buger-constructor/reducers";
import { useDrop } from "react-dnd";
import { FillingsCard } from "../fillings-card/fillings-card";
import { JSX, ReactNode } from "react";
import { TIngredient } from "../../../utils/types";

type TFillingsIngredient = TIngredient & {
  constructorId?: number;
};

type TFillingsIngredientProps = {
  children: ReactNode;
};

export function Fillings({}: TFillingsIngredientProps): JSX.Element {
  const filling: Array<TFillingsIngredient> = useSelector(selectFillings);
  const dispatch = useDispatch();

  const [, fillingDrop] = useDrop({
    accept: "filling",
    drop(ingredient: TIngredient) {
      fillingDropHandler(ingredient);
    },
  });

  function fillingDropHandler(ingredient: TIngredient) {
    dispatch(addFilling(ingredient));
  }
  return (
    <>
      {filling.length === 0 ? (
        <div className={`${styles.clean}`} ref={fillingDrop}>
          <p className="text text_type_main-default">Выберите начинку</p>
        </div>
      ) : (
        <div className={`${styles.fillings} custom-scroll`} ref={fillingDrop}>
          {filling.map((item: TFillingsIngredient, index) => {
            return (
              <FillingsCard
                ingredient={item}
                key={item["constructorId"]}
                index={index}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
