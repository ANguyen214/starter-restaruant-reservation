import React from "react";
import { deleteReservationFromTable } from "../utils/api";

function TableItem({ table, loadDashboard, tablesErrors, setTablesErrors }) {
  const freeOrOccupied = table.reservation_id ? "Occupied" : "Free";
  const finishButton = freeOrOccupied === "Occupied" && (
    <button data-table-id-finish={table.table_id} onClick={() => finish()}>
      Finish
    </button>
  );

  const finish = () => {
    async function removeReservationFromTable(table) {
      try {
        await deleteReservationFromTable(
          table.table_id,
          new AbortController().abort()
        );
        loadDashboard();
      } catch (error) {
        setTablesErrors((currentErrors) => error);
      }
    }

    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      setTablesErrors(null);
      removeReservationFromTable(table);
    }
  };

  return (
    table && (
      <div className="card">
        <h5 className="card-title">Table ID: {table.table_id}</h5>
        <div className="card-body">
          <p>
            Name: {table.table_name} <br />
            Table Capacity: {table.capacity} <br />
            {table.reservation_id &&
              `Seated Reservation ID: ${table.reservation_id}`}
          </p>
          <p data-table-id-status={table.table_id}>{freeOrOccupied}</p>
          {finishButton}
        </div>
      </div>
    )
  );
}

export default TableItem;