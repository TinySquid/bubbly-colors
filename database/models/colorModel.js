const db = require("../dbConfig");

module.exports = {
  getById,
  getByUserId,
  insert,
  update,
  remove,
};

function getById(id) {
  return db("colors")
    .where({ id })
    .first();
}

function getByUserId(user_id) {
  return db("colors").where({ user_id });
}

function insert(color) {
  return db("colors").insert(color, "id");
}

function update(id, changes) {
  return db("colors")
    .where({ id })
    .update(changes)
    .then(() => getById(id));
}

function remove(id, user_id) {
  return db("colors")
    .where({ id, user_id })
    .del();
}
