const express=require('express')
const User = require('../modals/User')
const bcrypt = require('bcryptjs');
const router=express.Router()
var jwt = require('jsonwebtoken');
const JWT_SECRET='iamgoo$boy'
const fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
// Route 1 create a user usig post /api/auth No auth is required creating a user no login required
router.post('/createuser',[
    // using data validation by ecpress validator
     
  body('email','enter a valid email').isEmail(),// username must be an email
  body('name','enter a valid name').isLength({min:3}),// username must be an email
  body('password','password shold not be less than 3 character').isLength({ min: 5 }),// password must be at least 5 chars long
],async(req,res)=>{
  //if there are error return bad request and error
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success=false;
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    // cheack wheather email exists already
  let user =await User.findOne({email:req.body.email})
  if(user){
    success=false;
    return res.status(404).json({success,err:"Sorry a user with email already exists"})
  }
  const  salt = await bcrypt.genSalt(10); //it retun a pramoise so we will use wait

  var securedPass =await bcrypt.hash(req.body.password, salt); //it retun a pramoise so we will use wait
user=await User.create({
    name: req.body.name,
    email: req.body.email,
    password: securedPass
  })
  data={
    user:{
      id:user.id
    }
  }
  const authtoken =jwt.sign(data,JWT_SECRET)
  console.log(authtoken)
  success=true;
  res.send({success,authtoken:authtoken})
  } catch (error) {
    console.error(error.message)
    res.status(500).send(success,"Some error occured")
  }
})
// Route 2 authenticate a user usig post /api/auth/login No auth is required creating a user no login required
router.post('/login',[
body('email','enter a valid email').isEmail(),// username must be an email
body('password','password can not be blank').exists(),// password cannot be blank

],async(req,res)=>{
  let success=false;
  //if there are error return bad request and error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
  // cheack wheather email belong to database or not
  let user =await User.findOne({email:req.body.email})
  if(!user){
    success=false
    return res.status(404).json({success,err:"Please try to login with correct crediential"})
  }
  const {email,password}=req.body
  const passwordCompare=await bcrypt.compare(password,user.password)    
  if(!passwordCompare){
    success=false
    return res.status(404).json({success,err:"Please try to login with correct crediential"})
  }
  // seonding payload using jwt
  const data={
    user:{
      id:user.id
    }
  }
  const authtoken =jwt.sign(data,JWT_SECRET)
  success = true;
  res.json({ success, authtoken })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Some error occured")
  }
})
// Route 3 fetching logged in  user details  a user usig post /api/auth/login No auth is required creating a user login required
router.post('/getuser' ,fetchuser ,async(req,res)=>{
      const userId=req.user.id
     const user =await User.findById(userId).select('-password') //it wiil find the user from the database and select all the fields except password
    //  console.log(user)
    res.json(user)
  })

module.exports=router //here we are exporting router so that we can use it in index.js