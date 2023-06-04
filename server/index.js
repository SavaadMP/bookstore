const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRouter = require("./routes/user");

// * exporess app
const app = express();

// * Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`db connected and server listening on ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
