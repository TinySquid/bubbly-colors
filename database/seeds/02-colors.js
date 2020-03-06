const defaultColors = require("../../defaultColors");

exports.seed = function(knex) {
	return knex("colors").insert(defaultColors);
};
