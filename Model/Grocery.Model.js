import mongoose from "mongoose";

// define the schema 
const Groceryschema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },

        description:{
            type:String,
            required:true,
        },

        price:{
            type: Number,
            required:true,
        },
        feature:[
            {
                color:{
                    type:String,
                    required:true,
                },
                Spec:{
                    type:String,
                    required:true,
                }
            }
        ],
        category:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true
        }
    }
);

const Products=mongoose.model('Products',Groceryschema);
export default Products