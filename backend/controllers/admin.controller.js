const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

/* ======= احصائيات الادمن ========== */

const getAdminStats = async (req, res) => {

try{

const totalUsers = await User.countDocuments();

const total                      = await Product.countDocuments({
isActive: true
});

const totalOrders = await Order.countDocuments();

const totalPaidOrders = await Order.countDocuments({
isPaid: true
});

/* ============= حساب الارباح ============ */

const revenueData = await Order.aggregate([
{ $match: { isPaid: true } },
{
$group:{
_id:null,
totalRevenue:{ $sum:"$totalPrice" }
}
}
]);

const totalRevenue =
revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

res.json({
totalUsers,
totalProducts,
totalOrders,
totalPaidOrders,
totalRevenue
});

}catch(error){

console.error(error);

res.status(500).json({
message:"Failed to fetch admin stats"
});

}

};


/* ============= جلب المستخدمين ============ */

const getAllUsers = async (req,res)=>{

try{

const users = await User.find()
.select("-password")
.sort({createdAt:-1});

res.json(users);

}catch(error){

console.error(error);

res.status(500).json({
message:"Failed to fetch users"
});

}

};


/* ========= تعديل صلاحيات المستخدم ========== */

const updateUserRole = async (req,res)=>{

try{

const user = await User.findById(req.params.id);

if(!user){
return res.status(404).json({
message:"User not found"
});
}

/* منع الأدمن من تعديل نفسه */

if(user._id.toString() === req.user._id.toString()){
return res.status(400).json({
message:"You cannot modify your own role"
});
}

user.isAdmin = req.body.isAdmin;

await user.save();

res.json({
message:"User role updated",
user
});

}catch(error){

console.error(error);

res.status(500).json({
message:"Failed to update role"
});

}

};


/* =========== حذف المستخدم ============== */

const deleteUser = async (req,res)=>{

try{

const user = await User.findById(req.params.id);

if(!user){
return res.status(404).json({
message:"User not found"
});
}

/* منع الأدمن من حذف نفسه */

if(user._id.toString() === req.user._id.toString()){
return res.status(400).json({
message:"You cannot delete yourself"
});
}

await user.deleteOne();

res.json({
message:"User deleted"
});

}catch(error){

console.error(error);

res.status(500).json({
message:"Failed to delete user"
});

}

};


module.exports = {
getAdminStats,
getAllUsers,
updateUserRole,
deleteUser
};