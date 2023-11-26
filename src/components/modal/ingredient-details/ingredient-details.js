import styles from '../ingredient-details/ingredient-details.module.css';
import { ingredientsPropTypes } from '../../../utils/ingredients-prop-types';

export default function ingredientDetails ({ingredients}) {
 
    return (
        <section className={styles.ingredientdetails}>
            <img className={styles.ingredientdetails__title} src={ingredients.image_large} alt={ingredients.name}></img>
            <p className={`${styles.ingredientdetails__name} text text_type_main-medium`}>{ingredients.name}</p>
            <div className={`${styles.ingredientdetails__information} mt-8 mb-15`}>
                <div className={styles.ingredientdetails__information_item}>
                    <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredients.calories}</p>
                </div>
                <div className={styles.ingredientdetails__information_item}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredients.proteins}</p>
                </div>
                <div className={styles.ingredientdetails__information_item}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredients.fat}</p>
                </div>
                <div className={styles.ingredientdetails__information_item}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredients.carbohydrates}</p>
                </div>
            </div>
        </section>  
    )
}

ingredientDetails.propTypes = {
    ingredients: ingredientsPropTypes.isRequired,
  };