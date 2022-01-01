import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createReservation, updateReservation } from "../../utils/api";
import {
  getDayOfWeek,
  today,
  timeNow,
  specifiedTime,
} from "../../utils/date-time";

function ReservationForm({
  reservationsErrors,
  setReservationsErrors,
  editMode = false,
  initialFormState,
}) {
  const [formState, setFormState] = useState(initialFormState);

  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = formState;
  const history = useHistory();
  const { reservationId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    setReservationsErrors((currentErrors) => null);

    async function createOrEditFormReservation(formState) {
      const abortController = new AbortController();
      try {
        const { reservation_date } = editMode
          ? await updateReservation(
              reservationId,
              formState,
              abortController.abort()
            )
          : await createReservation(formState, abortController.abort());
        history.push(`/dashboard/?date=${reservation_date}`);
      } catch (error) {
        setReservationsErrors(
          (currentErrors) => new Error("Backend Error: " + error.message)
        );
      }
    }

    try {
      if (formSubmitValidation(event)) createOrEditFormReservation(formState);
    } catch (error) {}
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleFormChange = (event) => {
    if (formChangeValidation(event)) {
      setFormState((currentState) => {
        const { name, value } = event.target;
        if (name === "people")
          return { ...currentState, [name]: Number(value) };
        return {
          ...currentState,
          [name]: value,
        };
      });
    }
  };

  const formChangeValidation = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "mobile_number") return !value.replace(/[0-9-]/g, "").length;
    if (name === "people") return value > 0;
    return true;
  };

  const formSubmitValidation = (event) => {
    const { reservation_date, reservation_time } = formState;
    const errors = [];
    if (getDayOfWeek(reservation_date) === 2)
      errors.push(
        new Error(
          "The restaurant is closed on Tuesdays. Please choose another day."
        )
      );
    if (
      reservation_date < today() ||
      (reservation_date === today() && reservation_time <= timeNow())
    )
      errors.push(
        new Error(
          "The selected reservation date is in the past. Only future reservations are allowed."
        )
      );
    if (reservation_time < specifiedTime(10, 30))
      errors.push(
        new Error(
          "The restaurant is closed before 10:30 AM. Please choose another time."
        )
      );
    if (reservation_time > specifiedTime(21, 30))
      errors.push(
        new Error(
          "The restaurant closes at 10:30 PM. Only reservations up to an hour before closing are allowed."
        )
      );
    if (errors.length) {
      setReservationsErrors((currentErrors) => errors);
      throw new Error(errors);
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="first_name">
        First Name
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="First Name"
          required
          value={first_name}
          onChange={handleFormChange}
        />
      </label>
      <br />
      <label htmlFor="last_name">
        Last Name
        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Last Name"
          required
          value={last_name}
          onChange={handleFormChange}
        />
      </label>
      <br />
      <label htmlFor="mobile_number">
        Mobile Number
        <input
          type="tel"
          id="mobile_number"
          name="mobile_number"
          placeholder="Mobile Number"
          required
          value={mobile_number}
          onChange={handleFormChange}
        />
      </label>
      <br />
      <label htmlFor="reservation_date">
        Reservation Date
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          required
          value={reservation_date}
          onChange={handleFormChange}
        />
      </label>
      <br />
      <label htmlFor="reservation_time">
        Reservation Time
        <input
          type="time"
          id="reservation_time"
          name="reservation_time"
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
          required
          value={reservation_time}
          onChange={handleFormChange}
        />
      </label>
      <br />
      <label htmlFor="people">
        People
        <input
          type="number"
          id="people"
          name="people"
          placeholder="People"
          required
          value={people}
          onChange={handleFormChange}
        />
      </label>
      <br />
      <button onClick={() => handleCancel()}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReservationForm;