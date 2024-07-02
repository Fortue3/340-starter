const pool = require("../database/")




/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */

async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
};
/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  try{
    const data = await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
    return data;
    
  }
    catch (error){
      console.log("getClassifications error" + error);
    }
  };
 

exports.getVehicleById = (inventoryId) => {
  // Query the inventory data source to find the vehicle with the given ID
  const vehicle = inventoryData.find((item) => item.id === inventoryId);
  return vehicle;
};

module.exports = {getClassifications,
   getInventoryByClassificationId,
 };
