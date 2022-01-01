import React from "react";
import { setReservationStatusToCancelled } from "../utils/api";

import "./ReservationItem.css";

function ReservationItem({
  reservation,
  showAll = false,
  reservationsErrors,
  setReservationsErrors,
}) {
  const seatAndEditButtons = reservation.status === "booked" && (
    <>
      <button>
        <a href={`/reservations/${reservation.reservation_id}/seat`}>Seat</a>
      </button>
      <button>
        <a href={`/reservations/${reservation.reservation_id}/edit`}>Edit</a>
      </button>
    </>
  );

  const cancelButton = reservation.status !== "cancelled" && (
    <button
      data-reservation-id-cancel={reservation.reservation_id}
      onClick={() => cancel()}
    >
      Cancel
    </button>
  );

  const reservationInfo = (
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
        <p data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </p>
        <div className="reservation-item-button">
          {seatAndEditButtons}
          {cancelButton}
        </div>
      </div>
    </div>
  );

  const cancel = () => {
    async function cancelReservation(reservation) {
      try {
        await setReservationStatusToCancelled(
          reservation.reservation_id,
          new AbortController().abort()
        );
        window.location.reload(false);
      } catch (error) {
        setReservationsErrors((currentErrors) => error);
      }
    }

    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      setReservationsErrors(null);
      cancelReservation(reservation);
    }
  };

  if (showAll) {
    return reservation && <>{reservationInfo}</>;
  }

  return (
    reservation &&
    reservation.status !== "finished" &&
    reservation.status !== "cancelled" && <>{reservationInfo}</>
  );
}

export default ReservationItem;