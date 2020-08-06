import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import classes from "./ContactData.module.css";
import axios from "../../../axios";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Name" },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: { type: "email", placeholder: "Your Email" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Street" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      postalCode: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Postal Code" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Country" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        valid: true,
        value: "fastest",
      },
    },
    formValid: false,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    for (let identifier in this.state.orderForm) {
      formData[identifier] = this.state.orderForm[identifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  checkValidity = (value, rules = {}) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, identifier) => {
    const updatedForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = { ...updatedForm[identifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[identifier] = updatedFormElement;

    let formValid = true;
    for (let ident in updatedForm) {
      formValid = updatedForm[ident].valid && formValid;
    }

    console.log(updatedFormElement);
    this.setState({ orderForm: updatedForm, formValid: formValid });
  };

  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form;
    if (this.state.loading) {
      form = <Spinner />;
    } else {
      form = (
        <form onSubmit={this.orderHandler}>
          {formElements.map((e) => (
            <Input
              key={e.id}
              elementType={e.config.elementType}
              elementConfig={e.config.elementConfig}
              value={e.config.value}
              invalid={!e.config.valid}
              shouldValidate={e.config.validation}
              touched={e.config.touched}
              changed={(event) => this.inputChangedHandler(event, e.id)}
            />
          ))}
          <Button
            btnType="Success"
            clicked={this.orderHandler}
            disabled={!this.state.formValid}
          >
            Order
          </Button>
        </form>
      );
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
