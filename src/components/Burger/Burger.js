import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import { withRouter } from "react-router-dom";
import styles from "./Burger.module.css";

const burger = (props) => {
  console.log(props);
  let transformedIngrds = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        return <BurgerIngredient key={igKey + "_" + index} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngrds.length === 0) {
    transformedIngrds = <p>Please start adding ingredients...</p>;
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngrds}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger)