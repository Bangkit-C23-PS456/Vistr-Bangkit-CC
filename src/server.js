const express = require('express');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');
const userRouter = require('./routes/user.router');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const placeRouter = require('./routes/place.router');
const cityRouter = require('./routes/city.router');

const app = express();

// Load env vars
dotenv.config({ path: './.env' });

//DEVELOPMENT loging
if (process.env.APP_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
  //directori log
  const logDirectory = path.join(__dirname, 'log');
  // ensure log directory exists
  if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

  // create a write stream (in append mode)
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory,
  });

  // setup the logger
  app.use(morgan('combined', { stream: accessLogStream }));
}


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/city',cityRouter)
app.use('/user', userRouter);
app.use('/place', placeRouter)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
