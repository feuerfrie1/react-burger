import styles from "../fillings/fillings.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilling,
  selectFilling,
} from "../../../services/store/buger-constructor/reducers";
import { useDrop } from "react-dnd";
import { FillingsCard } from "../fillings-card/fillings-card";

export function Fillings() {
  const filling = useSelector(selectFilling);
  const dispatch = useDispatch();

  const [, fillingDrop] = useDrop({
    accept: "filling",
    drop(ingredient) {
      fillingDropHandler(ingredient);
    },
  });

  function fillingDropHandler(ingredient) {
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
          {filling.map((item, index) => {
            return (
              <FillingsCard
                ingredient={item}
                key={item.constructorId}
                index={index}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
