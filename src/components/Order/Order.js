import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  console.log(props);
  const ingredients = [];
  for (let name in props.ingredients) {
    ingredients.push({
      name,
      amount: props.ingredients[name],
    });
  }

  const outputIngredients = ingredients.map((ig) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {outputIngredients}</p>
      <p>
        Price: <strong>USD {parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
