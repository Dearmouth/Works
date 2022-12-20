require('dotenv').config();
const mongoose = require('mongoose');

// connect to Mongoose
mongoose.connect(process.env.DB_CONN_URI, {
  useNewUrlParser: true,
});

const database = mongoose.connection;

// catch error
database.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

// logging on console
database.once('open', async () => {
  console.log('Connected to Mongo database');
});

require('./db');
module.exports = {mongoose};
