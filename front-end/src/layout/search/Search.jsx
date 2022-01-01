import React, { useState } from "react";
import { listReservations } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import ReservationItem from "../../dashboard/ReservationItem";

function Search({
  reservations,
  setReservations,
  reservationsErrors,
  setReservationsErrors,
}) {
  const initialFormState = {
    mobile_number: "",
  };
  const [formState, setFormState] = useState(initialFormState);
  const [findButtonClicked, setFindButtonClicked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setReservationsErrors((currentErrors) => null);

    searchForMatchingReservations(formState);
    setFindButtonClicked((buttonState) => true);
  };

  async function searchForMatchingReservations(formState) {
    const abortController = new AbortController();
    const mobile_number = formState.mobile_number;
    listReservations({ mobile_number }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsErrors);
    return () => abortController.abort();
  }

  const handleFormChange = (event) => {
    setFormState((currentState) => {
      return { [event.target.name]: event.target.value };
    });
  };

  const reservationsList = reservations.length
    ? reservations.map((reservation) => (
        <ReservationItem
          key={reservation.reservation_id}
          reservation={reservation}
          reservationsErrors={reservationsErrors}
          setReservationsErrors={setReservationsErrors}
          showAll={true}
        />
      ))
    : "No reservations found";

  const searchResults = findButtonClicked ? reservationsList : null;

  return (
    <>
      <ErrorAlert error={reservationsErrors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="mobile_number">
          Mobile Phone Number
          <input
            name="mobile_number"
            type="tel"
            id="mobile_number"
            placeholder="Enter a customer's phone number"
            required
            value={formState.mobile_number}
            onChange={handleFormChange}
          />
        </label>
        <button type="submit">Find</button>
      </form>
      Reservations: <br />
      {searchResults}
    </>
  );
}

export default Search;