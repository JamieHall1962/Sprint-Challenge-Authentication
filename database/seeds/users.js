const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'Mike Trout', password: bcrypt.hashSync("Angels", 14) },
        { username: 'Mookie Betts', password: bcrypt.hashSync("RedSox", 14) },
        { username: 'Jose Ramirez', password: bcrypt.hashSync("Indians", 14) }
      ]);
    });
};
