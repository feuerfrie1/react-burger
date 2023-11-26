import { useState, useEffect } from 'react';
import styles from '../app/app.module.css'
import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingridients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export default function App () {
  const ingredientsApi = 'https://norma.nomoreparties.space/api/ingredients'; 
  const [ingredients, setIngredients] = useState([]);

  useEffect(()=>{
    const getIngredients = () => {
      fetch(ingredientsApi)
        .then((res) => res.json())
        .then((data) => {
          setIngredients(data.data);
        }).catch((error) => {
          console.log(error);
          alert('Произошла ошибка при загрузке данных');
        }
        )
    }
    getIngredients();
  }, []
  );

    return (
        <section className={styles.app}>
          <Header />
        <main className={styles.main}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </main>
        </section>
    )
}
