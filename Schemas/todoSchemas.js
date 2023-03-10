const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    title:{
        type : String,
        required: true,
    },

    description: String,

    status :{
        type : String,
        enum: ["active", "inactive"]
    },
    
    date :{
        type : Date,
        default: Date.now
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})


// Instance Method
todoSchema.methods = {
    findActive: function(){
        return mongoose.model('Todo').find({status:"active"})
    }
}


module.exports = todoSchema
