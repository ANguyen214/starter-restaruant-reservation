import React from "react";
import ReservationForm from "../reservations/ReservationForm";
import ErrorAlert from "../ErrorAlert";

function CreateReservation({ reservationsErrors, setReservationsErrors }) {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  return (
    <>
      <ErrorAlert error={reservationsErrors} />
      <ReservationForm
        reservationsErrors={reservationsErrors}
        setReservationsErrors={setReservationsErrors}
        initialFormState={initialFormState}
      />
    </>
  );
}

export default CreateReservation;