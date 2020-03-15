//BASE
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//ROUTES
const apiRouter = require("./api/apiRouter");

//PORT
const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use(helmet());

//CORS CONFIGURATION
const whitelist = [];

if (process.env.NODE_ENV === "production") {
  whitelist.push(process.env.FRONT_END_URL);
} else {
  whitelist.push(process.env.FRONT_END_LOCALHOST);
}

const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    }
  },
};

app.use(cors(corsOptions));

app.use("/api", apiRouter);

app.get("/", function(req, res) {
  res.send("API is online 👍");
});

//Route fallback (404)
app.use(function(req, res) {
  res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
