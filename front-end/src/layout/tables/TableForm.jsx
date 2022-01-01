import React from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";

function TableForm({ formState, setFormState, tablesErrors, setTablesErrors }) {
  const { table_name, capacity } = formState;
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    setTablesErrors((currentErrors) => null);

    async function createFormTable(formState) {
      try {
        await createTable(formState, new AbortController().abort());
        history.push(`/dashboard`);
      } catch (error) {
        setTablesErrors(
          (currentErrors) => new Error("Backend Error: " + error.message)
        );
      }
    }

    createFormTable(formState);
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleFormChange = (event) => {
    setFormState((currentState) => {
      return {
        ...currentState,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="table_name">
        Table Name
        <input
          type="text"
          id="table_name"
          name="table_name"
          placeholder="Table Name"
          minLength="2"
          required
          value={table_name}
          onChange={handleFormChange}
        />
      </label>
      <br />
      <label htmlFor="capacity">
        Capacity
        <input
          type="number"
          id="capacity"
          name="capacity"
          placeholder="Capacity"
          min="1"
          required
          value={capacity}
          onChange={handleFormChange}
        />
      </label>
      <br />
      <button onClick={() => handleCancel()}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TableForm;