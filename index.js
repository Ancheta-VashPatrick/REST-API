const express = require("express");

const https = require("https");
const fs = require("fs");

const app = express();
const port = 3000;

const authenticationRouter = require("./routes/authentication");

const sensorDataRouter = require("./routes/sensor-data");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/", authenticationRouter);
app.use("/sensor-data", sensorDataRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Read SSL certificate and key files
const options = {
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost.pem"),
};
// Create HTTPS server
const server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
