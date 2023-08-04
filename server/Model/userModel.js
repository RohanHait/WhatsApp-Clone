const mongoose = require("mongoose");
const bcrypt  = require("bcryptjs") ;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, trim: true },
    email: { type: String, trim: true, unique: true },
    password: { type: String },
    profilePic: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
},
    { timestamps: true }
    
);
userSchema.pre('save',async function (next){
    if(this.modified)
    {
        next()
    } ;
    const salt = await bcrypt.genSalt(10) ;
    this.password = await bcrypt.hash(this.password,salt) ;
    next();
    
})
userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password,this.password)
}
module.exports = mongoose.model("User", userSchema);