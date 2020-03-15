const db = require("../dbConfig");

module.exports = {
  get,
  getById,
  getByUsername,
  insert,
  update,
  remove,
};

function get() {
  return db("users");
}

function getById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}

function insert(user) {
  return db("users").insert(user, "id");
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
