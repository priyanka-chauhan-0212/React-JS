const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

//config
dotenv.config({ path: './config/config.env' });

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: '*', credentials: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

const user = require('./routes/countryStateCityRoutes');

app.use('/api/v1', user);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
