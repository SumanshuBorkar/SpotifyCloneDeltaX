const express =require("express");
const Router = express.Router();
const {userRegisterCtrl, loginUserCtrl} = require("./../Controllers/Usercontroller");
const cors = require("cors");


Router
  .route('/signup')
  .post(userRegisterCtrl)

Router
   .route('/login')
   .post(cors(), loginUserCtrl) 


module.exports = Router;