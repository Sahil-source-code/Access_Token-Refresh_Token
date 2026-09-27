import mongoose from "mongoose"
const userSchema=mongoose.Schema({
    name:{
        type:"String",
        required:true  ,

    },
    email:{
        type:"String",
        required:true,
        unique:true,
        match:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    },
    passwordHash:{
        type:"String",  
        required:true,

    },
    refreshToken:{
        type:"String",
        
    }
})
const userModel=mongoose.model("User",userSchema)
export default userModel