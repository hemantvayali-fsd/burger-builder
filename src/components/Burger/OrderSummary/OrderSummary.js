import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

export default class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((key) => {
      return (
        <li key={key}>
          <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
          {this.props.ingredients[key]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Delicious burger with following ingredients: </p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: $ {this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.cancelPurchase}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continuePurchase}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}
