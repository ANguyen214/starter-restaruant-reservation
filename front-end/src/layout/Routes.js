import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import useQuery from "../utils/useQuery";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import CreateReservation from "./reservations-new/CreateReservation";
import CreateTable from "./tables-new/CreateTable";
import Seat from "./reservations-seat/Seat";
import Search from "./search/Search";
import EditReservation from "./reservations-edit/EditReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState(today());
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsErrors, setReservationsErrors] = useState(null);
  const [tablesErrors, setTablesErrors] = useState(null);
  const [reservation, setReservation] = useState(null);

  const query = useQuery();
  const queryDate = query.get("date");

  useEffect(() => {
    if (queryDate) setDate((currentDate) => queryDate);
  }, [queryDate]);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateReservation
          reservationsErrors={reservationsErrors}
          setReservationsErrors={setReservationsErrors}
        />
      </Route>
      <Route exact={true} path="/reservations/:reservationId/edit">
        <EditReservation
          reservationsErrors={reservationsErrors}
          setReservationsErrors={setReservationsErrors}
          reservation={reservation}
          setReservation={setReservation}
        />
      </Route>
      <Route path="/reservations/:reservationId/seat">
        <Seat
          tables={tables}
          setTables={setTables}
          tablesErrors={tablesErrors}
          setTablesErrors={setTablesErrors}
          reservationsErrors={reservationsErrors}
          setReservationsErrors={setReservationsErrors}
          reservation={reservation}
          setReservation={setReservation}
        />
      </Route>
      <Route exact={true} path="/tables/new">
        <CreateTable
          tablesErrors={tablesErrors}
          setTablesErrors={setTablesErrors}
        />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          date={date}
          reservations={reservations}
          setReservations={setReservations}
          tables={tables}
          setTables={setTables}
          reservationsErrors={reservationsErrors}
          setReservationsErrors={setReservationsErrors}
          tablesErrors={tablesErrors}
          setTablesErrors={setTablesErrors}
        />
      </Route>
      <Route path="/search">
        <Search
          reservations={reservations}
          setReservations={setReservations}
          reservationsErrors={reservationsErrors}
          setReservationsErrors={setReservationsErrors}
        />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes