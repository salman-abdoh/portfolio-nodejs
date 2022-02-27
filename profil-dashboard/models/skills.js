const mongoose = require("mongoose");

const schema =mongoose.Schema; 

var skillsSchema = new schema({
    id:{type:String,required:true},
    name:{ 
                type:String,
                required:true
            },
            description:{
                type:String,
                required:true,
            },
            date:{
                type:Date,
                required:true,
            },
            place:{
                type:String,
                required:true,
            },
            marks:{
                type:Number,
                required:true,
            },
        },
            {
                timestamps:true}
        
);
 
var skillsModel=mongoose.model('skills',skillsSchema);
 
module.exports = skillsModel;