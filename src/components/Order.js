import React from "react";

export default function Order(props) {
  const { details } = props;

  if (!details) {
    return <h3>Working fetching your order&apos;s details...</h3>
  }

  return (
    <div>
      <h2>{details.name}</h2>
      <p>{details.size}</p>
      {
        !!details.toppings && !!details.toppings.length &&
        <div>
          Toppings:
          <ul>
            {details.toppings.map((top, idx) => <li key={idx}>{top}</li>)}
          </ul>
        </div>
      }
    </div>
  )
}