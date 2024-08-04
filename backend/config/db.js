import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://indhums:310898@cluster0.gaujs8b.mongodb.net/Delivery-App').then(()=>console.log("DB Connected"));
}
