require("dotenv").config(); // allow use dotenv through out the package
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

connectDB();

app.use(logger);

// 3rd party middleware
app.use(cors(corsOptions));

// Built-in middleware - ability to process json.
app.use(express.json());

// 3rd party middleware
app.use(cookieParser());

/* __dirname look inside the folder that we are in
 root - index.html
 express.static is built-in middleware telling that where to grab files
*/
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/faculty", require("./routes/facultyRoutes"));
app.use("/courses", require("./routes/courseRoutes"));
app.use("/rooms", require("./routes/roomRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));
app.use("/enroll", require("./routes//studentEnrollRoute"));
app.use("/timetable", require("./routes/timeTableRoutes"));
app.use("/sessions", require("./routes/sessionRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

module.exports = app;
