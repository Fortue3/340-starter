const baseController = require("../controllers/baseController");
const utilities = require("../utilities/");
const router = require("express").Router()
const inventoryRoute = require("./inventoryRoute");



//index route
router.get("/", utilities.handleErrors(baseController.buildHome));
// Inventory routes
router.use("/inv", inventoryRoute);

module.exports = router;