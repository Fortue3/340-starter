const baseController = require("../controllers/baseController");

//index route
application.get("/", baseController.buildHome)
// Inventory routes
app.use("/inv", inventoryRoute)