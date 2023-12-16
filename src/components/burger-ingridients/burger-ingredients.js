import styles from "../burger-ingridients/burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCard from "./burger-ingredients-card";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectIngredients } from "../../services/store/burger-ingredients/reducers";
import {
  selectBun,
  selectFilling,
} from "../../services/store/buger-constructor/reducers";

function BurgerIngredients() {
  const list = useSelector(selectIngredients);

  const filling = useSelector(selectFilling);
  const bun = useSelector(selectBun);

  const buns = useMemo(
    () => list.filter((item) => item.type === "bun"),
    [list]
  );

  const sauces = useMemo(
    () => list.filter((item) => item.type === "sauce"),
    [list]
  );

  const main = useMemo(
    () => list.filter((item) => item.type === "main"),
    [list]
  );

  const tabsRef = useRef();
  const [current, setCurrent] = useState("buns");
  const [tabsRect, setTabsRect] = useState({});

  const ingredientsRef = {
    buns: useRef(),
    sauces: useRef(),
    main: useRef(),
  };

  function scrollRef() {
    const { y: bunY } = ingredientsRef.buns.current.getBoundingClientRect();
    const { y: saucesY } =
      ingredientsRef.sauces.current.getBoundingClientRect();
    const { y: mainY } = ingredientsRef.main.current.getBoundingClientRect();
    Math.abs(bunY) - tabsRect.y <= 100 && setCurrent("buns");
    Math.abs(saucesY) - tabsRect.y <= 100 && setCurrent("sauces");
    Math.abs(mainY) - tabsRect.y <= 100 && setCurrent("main");
  }

  useEffect(() => {
    setTabsRect(tabsRef.current.getBoundingClientRect());
  }, []);

  function toggleTab(e) {
    setCurrent(e);
    ingredientsRef[e].current.scrollIntoView({ behavior: "smooth" });
  }

  const ingredientsCounter = {};
  list.forEach((item) => {
    ingredientsCounter[item._id] = filling.reduce(
      (acc, ingredient) => (ingredient._id === item._id ? ++acc : acc),
      null
    );
  });
  bun !== null && (ingredientsCounter[bun._id] = 2);

  return (
    <section>
      <h2 className="text text_type_main-large mt-5 mb-3">Соберите бургер</h2>
      <nav className={styles.ingredients__section} ref={tabsRef}>
        <Tab value="buns" active={current === "buns"} onClick={toggleTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={toggleTab}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={toggleTab}>
          Начинки
        </Tab>
      </nav>
      <div
        className={`${styles.ingredients__cards} custom-scroll`}
        onScroll={scrollRef}
      >
        <h2
          ref={ingredientsRef.buns}
          className="text text_type_main-medium mt-5"
        >
          Булки
        </h2>
        <div className={styles.ingredients__cards_list}>
          {buns.map((item) => {
            return (
              <BurgerIngredientsCard
                ingredient={item}
                key={item._id}
                count={ingredientsCounter[item._id]}
              />
            );
          })}
        </div>
        <h2
          ref={ingredientsRef.sauces}
          className="text text_type_main-medium mt-5"
        >
          Соусы
        </h2>
        <div className={styles.ingredients__cards_list}>
          {sauces.map((item) => {
            return (
              <BurgerIngredientsCard
                ingredient={item}
                key={item._id}
                count={ingredientsCounter[item._id]}
              />
            );
          })}
        </div>
        <h2
          ref={ingredientsRef.main}
          id="section-3"
          className="text text_type_main-medium mt-5"
        >
          Начинки
        </h2>
        <div className={styles.ingredients__cards_list}>
          {main.map((item) => {
            return (
              <BurgerIngredientsCard
                ingredient={item}
                key={item._id}
                count={ingredientsCounter[item._id]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
