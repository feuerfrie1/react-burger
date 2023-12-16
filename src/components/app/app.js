import { useState, useEffect } from "react";
import styles from "../app/app.module.css";
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingridients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/store/burger-ingredients/actions";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <section className={styles.app}>
        <Header />
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
    </section>
  );
}
