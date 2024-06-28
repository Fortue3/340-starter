const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
};

exports.getInventoryItem = (req, res) => {
  const inventoryId = req.params.id;

  // Retrieve the specific vehicle's information from the inventory model
  const vehicle = invModel.getVehicleById(inventoryId);

  // Render the view and pass the vehicle data
  res.render('inventory/detail', { vehicle });
};
module.exports = invCont