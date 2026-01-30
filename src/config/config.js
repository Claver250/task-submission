require('dotenv').config(); 
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });// This loads your .env file

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "database_test",
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL', // Used for Heroku/Render deployment
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};