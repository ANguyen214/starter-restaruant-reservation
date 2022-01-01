const knex = require("../db/connection");

const tableName = "tables";
const tableAlias = require("../utils/tableAlias")(tableName);

function create(table) {
  return knex(tableAlias)
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(table_id) {
  return knex(tableAlias)
    .select("*")
    .where({ table_id })
    .then((returnedRecords) => returnedRecords[0]);
}

function update(
  table_id,
  reservation_id,
  reservationsReservationId = reservation_id,
  status = "seated"
) {
  return knex.transaction(function (trx) {
    return knex(tableAlias)
      .select("*")
      .where({ table_id })
      .update({ reservation_id })
      .then(() =>
        knex("reservations")
          .select("*")
          .where({ reservation_id: reservationsReservationId })
          .update({ status })
      )
      .then(trx.commit)
      .catch((error) => {
        trx.rollback();
        throw error;
      });
  });
}

function list() {
  return knex(tableAlias)
    .select("*")
    .groupBy("table_id")
    .orderBy("table_name");
}

module.exports = {
  create,
  read,
  update,
  list,
};