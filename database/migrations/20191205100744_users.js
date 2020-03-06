exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (users) {
      users.increments();
      users
        .string('username')
        .notNullable()
        .unique();
      users
        .string('password')
        .notNullable();
    })
    .createTable('colors', function (colors) {
      colors.increments();
      colors
        .string('color')
        .notNullable();
      colors
        .string('hex')
        .notNullable();
      colors
        .int('user_id')
        .notNullable();
    })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('colors');
};
