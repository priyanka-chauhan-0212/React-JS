const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("../backend/config/database");

//Handle Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to Uncaught Exception.`);
  process.exit(1);
});

//config
dotenv.config({ path: "./config/config.env" });

//Connecting to Db
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to unhandled promise rejection.`);
  server.close(() => {
    process.exit(1);
  });
});
