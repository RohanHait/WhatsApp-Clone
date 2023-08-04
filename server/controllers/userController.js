const asyncHandler = require("express-async-handler");
const Users = require("../Model/userModel");
const {generateToken} = require("../utils/tokenCoding");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ ERROR: { message: "Please fill all the fields" } });
    console.warn("Please fill all the fields");
  }
  if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
  {
    return res.status(400).json({ ERROR: { message: "Email is wrong" } });
  }
  const userExist = await Users.findOne({ email });
  if (userExist) {
    console.log(userExist)
    res.status(400).json({ ERROR: { message: "User already exists" } });
    // throw new Error("User already exists");
  }
  let user ;
  if(pic === "")
  user = await Users.create({
    name,
    email,
    password,
  });
  else 
  user = await Users.create({
    name,
    email,
    password,
    "profilePic" : pic
  });
  if (user) {
    const token = await generateToken(user._id)
    res.cookie("token",token,{
      expires : new Date(Date.now() + 30*24*3600*1000) ,
      httpOnly : true
    })
    res.status(201).json({
      _id : user._id,
      name: user.name,
      email: user.email,
      // password: user.password,
      profilePic: user.profilePic,
      token
    });
  }
});

const authUser = asyncHandler(async (req,res)=>{
  const {email,password} = req.body ;
  const user = await Users.findOne({email}) ;
  // console.log(user.matchPassword(password))
  if(user && await user.matchPassword(password))
  {
    const token = await generateToken(user._id)
    res.cookie("token",token,{
      expires : new Date(Date.now() + 30*24*3600*1000) ,
      httpOnly : true
    })
    res.status(200).send({
      name : user.name ,
      email : user.email ,
      _id : user._id ,
      profilePic : user.profilePic ,
      token
    })
  }
  else res.status(400).json({"ERROR" : {message : "Wrong Credential"}})
})
/**
 * @route /api/user?key=value
 */
const allUser = asyncHandler(async (req,res)=>{
    const keyword = req.query.search ; 
    // if(keyword.length < 3) res.send() ;
    
      Users.find({
        $or: [
          {name : {$regex : keyword , $options : "i"}},
          {email : {$regex : keyword , $options : "i"}}
        ]
      }).find({_id :{$ne : req.user._id}}).select("-password").then(data => {
        res.send(data) ;
      }).catch(err=>{
        res.status(500).send(err) ;
      }) ;
    }
)
const logout = asyncHandler(async (req, res) => {
  // Set token to none and expire after 200 milliseconds
  return res.cookie('token', 'none', {
      expires: new Date(Date.now() + 200),
      httpOnly: true,
  }).status(200).json({ success: true, message: 'User logged out successfully' })
})

const userInfo = asyncHandler(async (req,res)=>{
  Users.findById(req.user._id).select("-password").then(data => res.status(200).send(data)).catch(err => res.status(500).send({ERROR : {message : "Server Error"}})) ;
})

module.exports = { registerUser, authUser,allUser,logout,userInfo };