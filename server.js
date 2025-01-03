const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// connecting to the database
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection established:');
  })
  .catch((err) => console.error('DB connection error:', err));

// console.log(process.env);
// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
