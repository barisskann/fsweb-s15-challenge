const db = require("../../data/dbConfig");

function getUsers() {
  return db("users");
}
function getByIdUser(id) {
  return db("users").where("id", id).first();
}
function getByFilterUser(filter) {
  return db("users").where(filter);
}
function insertUser(data) {
  return db("users")
    .insert(data)
    .then((r) => getByIdUser(r[0]));
}

module.exports = {
  getUsers,
  getByIdUser,
  getByFilterUser,
  insertUser,
};
