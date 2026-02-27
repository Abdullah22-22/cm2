require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const jobRouter = require("./routes/jobRoutes");
const userRouter = require("./routes/userRouter");
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");

const app = express();

/* ================= CORS CONFIG ================= */

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",

  // Vercel domains
  "https://cm2-phi.vercel.app",
  "https://cm2-5tw5akwcg-abs-projects-05ca1b34.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, 
};

app.use(cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());


connectDB();


app.use("/jobs", jobRouter);
app.use("/users", userRouter);


app.use(unknownEndpoint);
app.use(errorHandler);


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});