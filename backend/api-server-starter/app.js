require('dotenv').config()
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const morgan = require("morgan");
// const userRouter = require("./routes/userRouter");
const jobRouter = require("./routes/jobRoutes");
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const loginRouter = require('./routes/userRouter');

// Middlewares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
connectDB();

// Use the userRouter for all /users routes
// app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/users",loginRouter)

app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
