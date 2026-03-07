const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
trim: true,
},

email: {
type: String,
required: true,
unique: true,
lowercase: true,
trim: true,
},

password: {
type: String,
required: true,
select: false,
},

role: {
type: String,
default: "user",
enum: ["user", "admin"],
},

resetToken: {
type: String,
},

resetTokenExpire: {
type: Date,
},

},
{ timestamps: true }
);


userSchema.set("toJSON", {
transform: (doc, ret) => {

delete ret.password;
delete ret.__v;
delete ret.resetToken;
delete ret.resetTokenExpire;

return ret;

},
});


module.exports = mongoose.model("User", userSchema);