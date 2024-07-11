const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController') 
const utilities = require("../utilities"); 
//const regValidate = require('../utilities/account-validation'); 
const { render } = require("ejs"); 



// login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))


//  registration view
router.post('/register', utilities.handleErrors(accountController.registerAccount))
//router.get("/register", utilities.handleErrors(accountController.buildRegister));

//  account view
router.get("/", 
        utilities.checkLogin, 
        utilities.handleErrors(accountController.buildAccount) 
        );

        // Process the login attempt
// router.post(
//         "/login",
//         (req, res) => {
//           res.status(200).send('login process')
//         }
//       );
      // Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)



module.exports = router;



