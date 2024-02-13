import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const cartSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },

    userId:{
        type:mongoose.Schema.type.ObjectId,
        ref:"User"
    },

    quantity: Number
})