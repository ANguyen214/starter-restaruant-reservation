import React from "react";

function ErrorComponent({ error }) {
  return (
    <>
      Error: {error.message}
      <br />
    </>
  );
}

export default ErrorComponent;