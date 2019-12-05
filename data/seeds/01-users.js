const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  const users = [];

  const admin = {
    username: 'admin',
    password: bcrypt.hashSync('password', 10)
  }

  users.push(admin);

  return knex('users').insert(users);
};

/*
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
*/