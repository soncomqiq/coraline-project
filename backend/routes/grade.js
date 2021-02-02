const router = require("express").Router();
const passport = require("passport");
const controller = require("../controllers");

router.get("/calculate", passport.authenticate("jwt", { session: false }), controller.grade.calculateGrade);

module.exports = router;