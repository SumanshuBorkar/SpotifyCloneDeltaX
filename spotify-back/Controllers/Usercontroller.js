const expressAsyncHandler = require( 'express-async-handler' );
const User = require( './../Modles/User' );
const bcrypt = require( "bcrypt" );
const jwt = require( "jsonwebtoken" );
const SECRATE_KEY = process.env.SECRATE_KEY;

// Code for Signing in or regestering in the user 

const userRegisterCtrl = expressAsyncHandler( async ( req, res ) => {
    
    try
    {
      let  password = req.body.password;
      let  email = req.body.email;
      let name = req.body.name;
      let hashedPassword = await bcrypt.hash( password, 10 );
  
      let user = await User.findOne( { email } );
      
      if ( user ) return res.status( 400 ).json( { status: "Failed", field: "email", message: "Email already exist!!" } )
      let newUser = await new User( {
        password: hashedPassword,
        email: email,
        name: name ,
        songs: []  
      } );
      newUser = await newUser.save();
      
      res.status( 201 ).json( { status: "Success", user: newUser } );
    } 
    catch ( err )
    {
      res.status( 400 ).json( { status: "Failed", message: err.message } );
    }
  
  } )


  // Code for Logging the user into the application


  const loginUserCtrl = expressAsyncHandler( async ( req, res ) => {
  
    try
    {
      let user = await User.findOne( { email: req.body.email } );
      if ( user )
      {
        let matchPass = await bcrypt.compare( req.body.password, user.password );
        if ( matchPass )
        {
          const token = await jwt.sign( { _id: user._id }, SECRATE_KEY );
          res.setHeader('Authorization', `Bearer ${token}`).send( {
            status: 'Successfully login',
            name: user.name,
            userId: user._id,
            token: token,
            // user: user
          } );
        } else {
    res.status( 401 ).send( { status: 'fail', message: 'User Details Not Match' } );
  }
      } else {
    res.status( 401 ).send( { status: 'fail', message: 'User Details Not Match' } );
  }
    } catch ( err )
  {
    res.status( 400 ).send( err.message );
  }
  });


  module.exports = { userRegisterCtrl, loginUserCtrl};