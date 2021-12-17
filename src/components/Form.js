export default function Form(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = evt => {
    evt.preventDefault();
    submit();
  }

  const onChange = evt => {
    const { name, value, checked, type } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    change(name, valueToUse);
  }

  return (
    <form id="pizza-form" onSubmit={onSubmit}>
      <div className="errors">
        <div>{errors.name}</div>
        <div>{errors.size}</div>
      </div>
      <div className="form-group inputs">
        <label><h3>Name:&nbsp;</h3>
          <input
            onChange={onChange}
            name="name"
            value={values.name}
            id="name-input"
            type="text"
          />
        </label>
      </div>
      <div className="form-group dropdown">
        <label><h3>Pizza Size:&nbsp;</h3>
          <select
            onChange={onChange}
            name="size"
            value={values.size}
            id="size-dropdown"
          >
            <option value=''>-- Select an option --</option>
            <option value='Small'>Small</option>
            <option value='Medium'>Medium</option>
            <option value='Large'>Large</option>
            <option value='Extra Large'>Extra Large</option>
            <option value='Extra EXTRA Large'>Extra EXTRA Large</option>
            <option value='Gargantuan'>Gargantuan</option>
          </select>
        </label>
      </div>
      <div className="form-group checkboxes">
        <h3>Toppings</h3>
        <label>Pepperoni
          <input
            type="checkbox"
            name="pepperoni"
            checked={values.pepperoni}
            onChange={onChange}
          />
        </label>
        <label>Sausage
          <input
            type="checkbox"
            name="sausage"
            checked={values.sausage}
            onChange={onChange}
          />
        </label>
        <label>Bacon
          <input
            type="checkbox"
            name="bacon"
            checked={values.bacon}
            onChange={onChange}
          />
        </label>
        <label>Anchovies
          <input
            type="checkbox"
            name="anchovies"
            checked={values.anchovies}
            onChange={onChange}
          />
        </label>
      </div>
      <div className="form-group inputs">
        <label><h3>Special Instructions</h3>
          <input
            onChange={onChange}
            name="special"
            value={values.special}
            id="special-text"
            type="text"
          />
        </label>
      </div>
      <button type="submit" id="order-button" disabled={disabled}>Submit Order</button>
    </form>
  )
}