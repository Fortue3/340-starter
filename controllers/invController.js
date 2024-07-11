const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/*  Build management view
* ************************** */

// Controller function to render the management view
invCont.buildManagement = async function(req, res, next){
  let nav = await utilities.getNav();
  const links = await utilities.getManagementLinks();
  const classificationSelect = await utilities.buildClassificationGrid();
  res.render("./inventory/management", {
      title: "Vehicle Management", 
      nav, 
      links, 
      error: null,
      classificationSelect,
  })
}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
};





invCont.addClassification = async function (req, res) {
  let nav = await utilities.getNav();
  const {classificationName} = req.body;
  const newClassification = await invModel.addClassification(classificationName);
  if (newClassification) {
    req.flash("notice", `${classificationName} has been added as a classification.`);
      res.redirect("./");
  } else {
      req.flash("notice", "Classification not added, try again");
      res.status(501).render("inventory/add-classification", {
          title: "Add New Classification", 
          nav, 
      });
  }

/* ***************************
 *  Build add inventory view
 * ************************** */


invCont.buildAddInventory = async function(req, res, next){
  let nav = await utilities.getNav();
  const selectList = await utilities.buildClassificationList();
  res.render("./inventory/add-inventory", {
      title : "Add New Vehicle",
      nav, 
      selectList, 
      errors: null,
      classification_id: null,
      inv_make: null,
      inv_model: null,
      inv_description: null,
      inv_image: null,
      inv_thumbnail: null,
      inv_price: null,
      inv_year: null,
      inv_miles: null,
      inv_color: null,
  })
}




invCont.addVehicle = async function(req, res, next){
  let nav = await utilities.getNav();
  const {
      classification_id, 
      inv_make,
      inv_model, 
      inv_description, 
      inv_image, 
      inv_thumbnail, 
      inv_price, 
      inv_year, 
      inv_miles, 
      inv_color
  } = req.body;

  const newVehicle = await invModel.addVehicle(
      classification_id,
      inv_make, 
      inv_model, 
      inv_description, 
      inv_image, 
      inv_thumbnail, 
      inv_price, 
      inv_year, 
      inv_miles, 
      inv_color,
  );
  
  
  if (newVehicle) {
      req.flash("notice", `${inv_make} ${inv_model} has been added.`);
      res.redirect("./");
  } else {
      req.flash("notice", "Vehicle not added, try again");
      res.status(501).render("inventory/add-inventory", {
          title: "Add New Vehicle", 
          nav, 
      });
  }
}


invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id);
  const invData = await invModel.getInventory(classification_id);
  
  if (invData[0].inv_id) {
      return res.json(invData);
  } else {
      next(new Error("No data returned"));
  }
};



//exports.getInventoryItem  = (req, res) => {
  //const inventoryId = req.params.id;

  // Retrieve the specific vehicle's information from the inventory model
  //const vehicle = invModel.getVehicleById(inventoryId);

  // Render the view and pass the vehicle data
  //res.render('inventory/detail', { vehicle });
};

module.exports=invCont;