import styles from "../burger-ingridients/burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCard from "./burger-ingredients-card";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  JSX,
  MutableRefObject,
} from "react";
import { useSelector } from "react-redux";
import { selectIngredients } from "../../services/store/burger-ingredients/reducers";
import {
  selectBun,
  selectFillings,
} from "../../services/store/buger-constructor/reducers";
import { TIngredient, TMonoTypeObject } from "../../utils/types";
import { useAppSelector } from "../../services/store/hooks";

type TBurgerIngredients = {
  [name: string]: MutableRefObject<HTMLElement | null>;
};

const BurgerIngredients = (): JSX.Element => {
  const list: Array<TIngredient> = useAppSelector(selectIngredients);

  const filling: Array<TIngredient> = useSelector(selectFillings);
  const bun: TIngredient | null = useSelector(selectBun);

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

  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [currentTab, setCurrentTab] = useState<string>("buns");
  const [tabsRectY, setTabsRectY] = useState<number>(0);

  const ingredientsRef: TBurgerIngredients = {
    buns: useRef<HTMLElement | null>(null),
    sauces: useRef<HTMLElement | null>(null),
    main: useRef<HTMLElement | null>(null),
  };

  function scrollRef() {
    const bunY = ingredientsRef.buns.current!.getBoundingClientRect().y || 0;
    const saucesY =
      ingredientsRef.sauces.current!.getBoundingClientRect().y || 0;
    const mainY = ingredientsRef.main.current!.getBoundingClientRect().y || 0;
    Math.abs(bunY) - tabsRectY <= 100 && setCurrentTab("buns");
    Math.abs(saucesY) - tabsRectY <= 100 && setCurrentTab("sauces");
    Math.abs(mainY) - tabsRectY <= 100 && setCurrentTab("main");
  }

  useEffect(() => {
    setTabsRectY(tabsRef.current!.getBoundingClientRect().y || 0);
  }, []);

  function toggleTab(e: string) {
    setCurrentTab(e);
    ingredientsRef[e].current!.scrollIntoView({ behavior: "smooth" });
  }

  const ingredientsCounter: TMonoTypeObject<number> = {};
  filling.forEach((item) => {
    ingredientsCounter[item["_id"]] = filling.reduce(
      (acc, ingredient: TIngredient) =>
        ingredient._id === item["_id"] ? ++acc : acc,
      0
    );
  });
  bun !== null && (ingredientsCounter[bun["_id"]] = 2);

  return (
    <section>
      <h2 className="text text_type_main-large mt-5 mb-3">Соберите бургер</h2>
      <nav className={styles.ingredients__section} ref={tabsRef}>
        <Tab value="buns" active={currentTab === "buns"} onClick={toggleTab}>
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={currentTab === "sauces"}
          onClick={toggleTab}
        >
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === "main"} onClick={toggleTab}>
          Начинки
        </Tab>
      </nav>
      <div
        className={`${styles.ingredients__cards} custom-scroll`}
        onScroll={scrollRef}
      >
        <h2
          // @ts-ignore
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
          // @ts-ignore
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
          // @ts-ignore
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
};

export default BurgerIngredients;
