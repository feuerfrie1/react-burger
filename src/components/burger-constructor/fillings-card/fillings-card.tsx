import styles from "../fillings-card/fillings-card.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { useRef, JSX, SyntheticEvent } from "react";
import {
  removeFilling,
  sortFilling,
} from "../../../services/store/buger-constructor/reducers";
import { TIngredient } from "../../../utils/types";
import { Identifier } from "dnd-core";

type TFillingsCardProps = {
  ingredient: TIngredient;
  index: number;
};

type TDnDDragObject = {
  ingredient: TIngredient;
  index: number;
};

type TDropCollectedProps = {
  handlerId: Identifier | null;
};

export function FillingsCard({
  ingredient,
  index,
}: TFillingsCardProps): JSX.Element {
  const dispatch = useDispatch();

  function deleteButtonHandler() {
    dispatch(removeFilling(index));
  }

  const ref = useRef<HTMLDivElement | null>(null);

  const [{ handlerId }, drop] = useDrop<
    TDnDDragObject,
    unknown,
    TDropCollectedProps
  >({
    accept: "sortable",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(
        sortFilling({ from: dragIndex, to: hoverIndex, item: item.ingredient })
      );
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    type: "sortable",
    item: () => {
      return { ingredient, index };
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={styles.fillings__card}
      data-index={index}
      data-handler-id={handlerId}
    >
      <div className={styles.fillings__dragicon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={deleteButtonHandler}
      />
    </div>
  );
}
