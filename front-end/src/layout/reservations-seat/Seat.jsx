import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { listTables, readReservation, updateTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function Seat({
  tables,
  setTables,
  tablesErrors,
  setTablesErrors,
  reservationsErrors,
  setReservationsErrors,
  reservation,
  setReservation,
}) {
  const initialFormState = {
    table_id: "",
  };

  // Make sure to add filter for tables by reservation size
  // Wait until you see how the tests for this look
  // Message or some routing option for no open tables

  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState(null);
  const { reservationId } = useParams();
  const history = useHistory();

  useEffect(loadSeatPage, [
    reservationId,
    setTables,
    setTablesErrors,
    setReservationsErrors,
    setReservation,
  ]);

  function loadSeatPage() {
    const abortController = new AbortController();
    setReservationsErrors(null);
    setTablesErrors(null);
    listTables(abortController.signal).then(setTables).catch(setTablesErrors);
    readReservation(reservationId, abortController.signal)
      .then(setReservation)
      .catch(setReservationsErrors);
    return () => abortController.abort();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setReservationsErrors((currentErrors) => null);
    setTablesErrors((currentErrors) => null);

    async function updateFormTable(formState, reservationId) {
      try {
        await updateTable(
          formState.table_id,
          reservationId,
          new AbortController().abort()
        );
        history.push("/dashboard");
      } catch (error) {
        setFormError(
          (currentErrors) => new Error("Backend Error: " + error.message)
        );
      }
    }

    if (!formError) updateFormTable(formState, reservationId);
  };

  const handleCancel = () => {
    history.push("/");
  };

  const handleFormChange = (event) => {
    setFormError(null);
    setFormState((currentState) => {
      return {
        ...currentState,
        [event.target.name]: event.target.value,
      };
    });
    setFormError(formChangeValidation(event));
  };

  const formChangeValidation = (event) => {
    const table_id = Number(event.target.value);
    const table = tables?.find((table) => table.table_id === table_id);
    if (!table) return new Error("Table not found");
    if (table.capacity < reservation.people)
      return new Error(
        "This table does not have the capacity for this reservation size."
      );
    return null;
  };

  const seatList = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  return (
    reservation && (
      <>
        <ErrorAlert error={tablesErrors} />
        <ErrorAlert error={reservationsErrors} />
        <ErrorAlert error={formError} />
        <div className="card">
          <h5 className="card-title">
            Reservation ID: {reservation.reservation_id}
          </h5>
          <div className="card-body">
            <p>
              Name: {reservation.first_name} {reservation.last_name} <br />
              Phone: {reservation.mobile_number} <br />
              Reservation Date: {reservation.reservation_date} <br />
              Reservation Time: {reservation.reservation_time} <br />
              Number of People: {reservation.people} <br />
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="table_id">
            Table
            <select
              name="table_id"
              id="table_id"
              required
              onChange={handleFormChange}
              value={formState.table_id}
            >
              <option value="">-- Select an Option --</option>
              {seatList}
            </select>
          </label>
          <button onClick={() => handleCancel()}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      </>
    )
  );
}

export default Seat;