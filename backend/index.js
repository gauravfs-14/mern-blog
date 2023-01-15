const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

//required middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/author", require("./routes/author.routes"));

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
