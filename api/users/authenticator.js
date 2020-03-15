const moment = require("moment");
const jwt = require("jwt-simple");

const Users = require("../../database/models/userModel");

function authenticator(req, res, next) {
  const { authorization } = req.headers;

  if (authorization) {
    //Authorization head sent with token.
    const secret = Buffer.from(process.env.SECRET, process.env.SECRET_ENCODING);
    const token = jwt.decode(authorization, secret);

    if (moment().isBefore(moment(token.expiration))) {
      //JWT hasn't expired yet, so it's still valid.
      Users.getById(token.id)
        .then((user) => {
          if (user) {
            //User is valid

            //Reset expiration
            token.expiration = moment().add(10, "minutes");
            const updatedToken = jwt.encode(token, secret);

            //Set new token in req for route to access and send back to client.
            req.token = updatedToken;
            req.userId = token.id;
            //Proceed.
            next();
          } else {
            //Bad token
            res.status(403).json({ message: "Invalid token provided." });
          }
        })
        .catch((error) => {
          //Error getting user matching id (or invalid token)
          res.status(500).json({ message: "Could not get user from database.", error: error.data });
        });
    } else {
      //Token expired, user cannot access this part of the website.
      res.status(403).json({ message: "Must be logged in." });
    }
  } else {
    res.status(403).json({ message: "No token provided." });
  }
}

module.exports = authenticator;
