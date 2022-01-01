import React, { useState } from "react";
import TableForm from "../tables/TableForm";
import ErrorAlert from "../ErrorAlert";

function CreateTable({tablesErrors, setTablesErrors}) {
  const initialFormState = {
    table_name: "",
    capacity: ""
  }

  const [formState, setFormState] = useState(initialFormState);

  return (
    <>
      <ErrorAlert error={tablesErrors} />
      <TableForm
        formState={formState}
        setFormState={setFormState}
        tablesErrors={tablesErrors}
        setTablesErrors={setTablesErrors}
      />
    </>
  )
}

export default CreateTable;