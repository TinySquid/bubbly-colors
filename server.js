//BASE
require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//ROUTES
const apiRouter = require('./api/apiRouter');

//PORT
const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use(helmet());

//CORS CONFIGURATION
const whitelist = ['https://bubbly-colors.netlify.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS policy"));
    }
  }
}

app.use(cors());

app.options('*', cors()); // include before other routes

app.use('/api', apiRouter);

app.get("/", function (req, res) {
  res.send("API is online 👍");
});

//Route fallback (404)
app.use(function (req, res) {
  res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});