const mongoose = require("mongoose");

/* ================= SIZE SCHEMA ================= */

const sizeSchema = new mongoose.Schema(
{
  size:{
    type:String,
    enum:["S","M","L","XL"],
    required:true
  },

  stock:{
    type:Number,
    required:true,
    min:0,
    default:0
  }

},
{ _id:false }
);


/* ================= REVIEW SCHEMA ================= */

const reviewSchema = new mongoose.Schema(
{
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  name:{
    type:String,
    required:true
  },

  rating:{
    type:Number,
    required:true,
    min:1,
    max:5
  },

  comment:{
    type:String,
    required:true
  }

},
{
  timestamps:true
}
);


/* ================= PRODUCT SCHEMA ================= */

const productSchema = new mongoose.Schema(
{

  name:{
    type:String,
    required:true,
    trim:true
  },

  description:{
    type:String,
    required:true
  },

  material:{
    type:String,
    default:""
  },

  fit:{
    type:String,
    default:""
  },

  fabricWeight:{
    type:String,
    default:""
  },

  care:{
    type:String,
    default:""
  },

  price:{
    type:Number,
    required:true,
    min:0
  },

  category:{
    type:String,
    required:true
  },

  gender:{
    type:String,
    enum:["men","women"],
    required:true
  },

  images:{
    type:[String],
    default:[]
  },

  sizes:{
    type:[sizeSchema]
  },

  reviews:{
    type:[reviewSchema],
    default:[]
  },

  rating:{
    type:Number,
    default:0,
    min:0,
    max:5
  },

  numReviews:{
    type:Number,
    default:0
  },

  isActive:{
    type:Boolean,
    default:true
  }

},
{
  timestamps:true
});

module.exports = mongoose.model("Product",productSchema);