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
    </div>
  )
}