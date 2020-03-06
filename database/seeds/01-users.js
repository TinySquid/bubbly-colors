const bcrypt = require("bcrypt");

exports.seed = function(knex) {
	return knex("users").insert({ username: "demo", password: bcrypt.hashSync("demo", 10) });
};
