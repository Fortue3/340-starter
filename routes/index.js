const baseController = require("../controllers/baseController");

//index route
application.get("/", baseController.buildHome)