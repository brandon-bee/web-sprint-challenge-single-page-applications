export default function Form(props) {
  const { values, submit, change, disabled, errors } = props;

  return (
    <form id="pizza-form" onSubmit={submit}>
      <div className="errors">
        <div>{errors.name}</div>
        <div>{errors.size}</div>
      </div>
      <label>Name:&nbsp;
        <input
          onChange={change}
          name="name"
          value={values.name}
          id="name-input"
          type="text"
        />
      </label>
      <label>&nbsp;Pizza Size:&nbsp;
        <select
          onChange={change}
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
      &nbsp;<button type="submit" id="submitButton" disabled={disabled}>Submit Order</button>
    </form>
  )
}