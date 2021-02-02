const router = require("express").Router();
const passport = require("passport");
const controller = require("../controllers");

router.post("/login", controller.auth.login);
router.post("/register", controller.auth.register);
router.get("/logout", controller.auth.logout);
router.get("/profile", passport.authenticate("jwt", { session: false }), controller.auth.getUserProfile);

module.exports = router;