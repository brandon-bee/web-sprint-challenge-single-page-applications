import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import axios from 'axios';
import * as yup from 'yup';
import formSchema from "./validation/formSchema";
import Home from "./components/Home";
import Form from './components/Form';
import Order from "./components/Order";


const initialFormState = {
  name: "",
  size: "",
  pepperoni: false,
  sausage: false,
  bacon: false,
  anchovies: false,
  special: "",
}
const initialFormErrors = {
  name: "Name is required",
  size: "Pizza size is required",
}

const App = () => {
  let history = useHistory();
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);

  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/api/orders', newOrder)
      .then(resp => {
        setOrders([ resp.data, ...orders ]);
        history.push('/orders');
        console.log(resp.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setForm(initialFormState);
      })
  }
  
  const validate = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        });
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })
  }

  const submitHandler = () => {
    const newOrder = {
      name: form.name.trim(),
      size: form.size.trim(),
      toppings: ['pepperoni', 'sausage', 'bacon', 'anchovies'].filter(hobby => !!form[hobby]),
      special: form.special.trim(),
    }
    postNewOrder(newOrder);
  }

  const changeHandler = (name, value) => {
    setForm({ ...form, [name]: value });
    validate(name, value);
  }

  useEffect(() => {
    formSchema.isValid(form).then(valid => setDisabled(!valid))
  }, [form])

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
