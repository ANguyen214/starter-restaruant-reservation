import React, { useEffect } from "react";
import ReservationForm from "../reservations/ReservationForm";
import ErrorAlert from "../ErrorAlert";
import { useParams } from "react-router";
import { readReservation } from "../../utils/api";

function EditReservation({
  reservationsErrors,
  setReservationsErrors,
  reservation,
  setReservation,
}) {
  const { reservationId } = useParams();

  useEffect(loadEditReservationPage, [
    reservationId,
    setReservationsErrors,
    setReservation,
  ]);

  function loadEditReservationPage() {
    const abortController = new AbortController();
    setReservationsErrors(null);
    readReservation(reservationId, abortController.signal)
      .then(setReservation)
      .catch(setReservationsErrors);
    return () => abortController.abort();
  }

  const reservationForm = reservation && (
    <ReservationForm
      reservationsErrors={reservationsErrors}
      setReservationsErrors={setReservationsErrors}
      editMode={true}
      initialFormState={
        reservation && {
          first_name: reservation.first_name,
          last_name: reservation.last_name,
          mobile_number: reservation.mobile_number,
          reservation_date: reservation.reservation_date,
          reservation_time: reservation.reservation_time,
          people: reservation.people,
        }
      }
    />
  );

  return (
    <>
      <ErrorAlert error={reservationsErrors} />
      {reservationForm}
    </>
  );
}

export default EditReservation;