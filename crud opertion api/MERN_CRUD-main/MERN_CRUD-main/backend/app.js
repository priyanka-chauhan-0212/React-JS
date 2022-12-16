const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

//config
dotenv.config({ path: "./config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

// app.use(fileUpload());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization, *"
//   );

//   next();
// });

// ROute Imports

const user = require("./routes/userRoute");

app.use("/api/v1", user);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
