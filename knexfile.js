require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.LOCAL_URL 
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL 
  }

};
