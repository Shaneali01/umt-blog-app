const mongoose=require('mongoose');
const validator=require('validator')

const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"PLEASE ENTER A VALID EMAIL"]
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    photo:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true

        }
    },
    education:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['user','admin']
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:8
    },
    token:String
},{timestamps:true})
const usermodel=mongoose.model('UserModel',userschema)
module.exports=usermodel