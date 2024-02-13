// import mongoose from "mongoose";

// export const productSchema = new mongoose.Schema({
//     name: String,
//     desc: String,
//     category: String,
//     price: Number,
//     inStrock: Number,
//     reviews:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"Review",
//         }
//     ],
//     categories:[{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Category",
        
//     }]
    
// })

import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    inStock: Number,
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    categories:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Category'
        }
    ]
});