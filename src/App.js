import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import axios from "axios";
import * as yup from 'yup';
import formSchema from "./validation/formSchema";
import Home from "./components/Home";
import Form from './components/Form';
import Order from "./components/Order";


const initialFormState = {
  name: "",
  size: "",
}
const initialFormErrors = {
  name: "",
  size: "Pizza size is required",
}

const App = () => {
  let history = useHistory();
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);

  const validate = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        });
        setDisabled(false);
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
        setDisabled(true);
      })
  }

  useEffect(() => {
    axios.get('https://reqres.in/api/orders')
      .then(resp => {
        setOrders(resp.data.data);
      })
      .catch(err => {
        console.error(err);
      })
  }, [])

  const submitHandler = (evt) => {
    evt.preventDefault();
    axios.post('https://reqres.in/api/orders', form)
      .then(resp => {
        setOrders([ resp.data, ...orders ]);
        setForm(initialFormState);
        history.push('/orders');
      })
  }

  useEffect(() => {
    formSchema.isValid(form).then(valid => setDisabled(!valid))
  }, [form])

  const changeHandler = (evt) => {
    // console.log(evt.target.name, evt.target.value);
    const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    setForm({ ...form, [evt.target.name]: value });
    validate(evt.target.name, value);
  }

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/pizza" id="order-pizza">Order Pizza?</Link>
        <Link to="/orders">Order History</Link>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/pizza">
          <Form
            values={form}
            submit={submitHandler}
            change={changeHandler}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>
        <Route exact path="/orders">
          <section>
            {
              orders.map(order => {
                return (
                  <Order key={`orderId-${order.id}`} details={order} />
                )
              })
            }
          </section>
        </Route>
      </Switch>
    </div>
  );
};
export default App;
