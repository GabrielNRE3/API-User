var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'nemesis',
      database : 'apirestum'
    }
  });

module.exports = knex
//NOTE: The database configurations vary, and should be configured individualy for each project