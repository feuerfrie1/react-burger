import styles from "../home/home.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingridients/burger-ingredients";

export default function Home() {
  return (
    <section className={styles.app}>
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor
            ingredient={{
              _id: "",
              name: "",
              type: "",
              proteins: 0,
              fat: 0,
              carbohydrates: 0,
              calories: 0,
              price: 0,
              image: "",
              image_mobile: "",
              image_large: "",
              __v: 0,
              constructorExtraType: "bun",
            }}
            index={0}
          />
        </DndProvider>
      </main>
    </section>
  );
}
