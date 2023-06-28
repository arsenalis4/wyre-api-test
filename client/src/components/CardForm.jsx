// ./components/CardForm.jsx
import React, { Component } from "react";
import { Input } from "../common/Input";
import { createPaymentMethod } from "../services/wyreApiService";

class CardForm extends Component {
  state = {
    data: {
      number: "",
      expirationMonth: "",
      expirationYear: "",
      cvv: "",
    },
    errors: {},
  };

  // Validate the card input and return an object with error messages
  validate = () => {
    const errors = {};
    const { data } = this.state;
    if (data.number.trim() === "")
      errors.number = "카드 번호를 입력해주세요.";
    if (data.expirationMonth.trim() === "")
      errors.expirationMonth = "유효 기간 월을 입력해주세요.";
    if (data.expirationYear.trim() === "")
      errors.expirationYear = "유효 기간 년을 입력해주세요.";
    if (data.cvv.trim() === "") errors.cvv = "CVV를 입력해주세요.";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Handle the change of input value and update the state
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  // Handle the submission of the form and call the createPaymentMethod function
  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      const { data } = this.state;
      const paymentMethod = await createPaymentMethod(data);
      this.props.onSuccess(paymentMethod);
    } catch (ex) {
      console.log(ex);
      this.props.onError(ex);
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="number"
          label="카드 번호"
          value={data.number}
          onChange={this.handleChange}
          error={errors.number}
        />
        <Input
          name="expirationMonth"
          label="유효 기간 월"
          value={data.expirationMonth}
          onChange={this.handleChange}
          error={errors.expirationMonth}
        />
        <Input
          name="expirationYear"
          label="유효 기간 년"
          value={data.expirationYear}
          onChange={this.handleChange}
          error={errors.expirationYear}
        />
        <Input
          name="cvv"
          label="CVV"
          value={data.cvv}
          onChange={this.handleChange}
          error={errors.cvv}
        />
        <button type="submit" className="btn btn-primary">
          결제하기
        </button>
      </form>
    );
  }
}

export default CardForm;
