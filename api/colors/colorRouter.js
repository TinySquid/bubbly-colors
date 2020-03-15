const router = require("express").Router();

const Colors = require("../../database/models/colorModel");

const authenticator = require("../users/authenticator");
const defaultColors = require("../../defaultColors");

//All color routes require authentication.
router.use(authenticator);

//GET /colors - Get all colors by user id (id is retreived from JWT).
router.get("/", (req, res) => {
  const id = req.userId;

  Colors.getByUserId(id)
    .then((colors) => {
      if (colors.length < 1) {
        Colors.insert(defaultColors(id))
          .then(() => {
            Colors.getByUserId(id)
              .then((colors) => {
                res.status(200).json({
                  token: req.token,
                  colors: colors,
                });
              })
              .catch((error) => {
                res.status(500).json({ message: "Could not get default colors", error: error.data });
              });
          })
          .catch((error) => {
            res.status(500).json({ message: "Could not set default colors", error: error.data });
          });
      } else {
        res.status(200).json({
          token: req.token,
          colors: colors,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not get colors from database" });
    });
});

//POST /colors - Add new color
router.post("/", validateColor, (req, res) => {
  Colors.insert({ ...req.body, user_id: req.userId })
    .then((colorId) => {
      res.status(201).json({
        token: req.token,
        colorId: colorId,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not add color to the database", error: error });
    });
});

//PUT /colors/:id - Edit existing color by id
router.put("/:id", validateColor, (req, res) => {
  const id = req.params.id;

  Colors.update(id, req.body)
    .then((color) => {
      res.status(200).json({
        token: req.token,
        color: color,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not update color info", error: error });
    });
});

//DELETE /colors/:id - Delete a color by ID.
router.delete("/:id", validateColorId, (req, res) => {
  const id = req.params.id;

  Colors.remove(id, req.userId)
    .then((didDelete) => {
      if (didDelete) {
        res.status(200).json({ token: req.token });
      } else {
        res.status(404).json({ message: "Color not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not delete color", error: error });
    });
});

//MIDDLEWARE
//Validate that a valid color ID has been given.
function validateColorId(req, res, next) {
  const id = req.params.id;
  Colors.getById(id)
    .then((color) => {
      if (color) {
        next();
      } else {
        res.status(404).json({ message: "Specified color id not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not get color by id", error: error });
    });
}

//Validate that properties for a color have been given
function validateColor(req, res, next) {
  if (req.body.color && req.body.hex) {
    next();
  } else {
    res.status(400).json({ message: "Please provide color and color code" });
  }
}

module.exports = router;
