const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title:{
        type: String,
        require:[true, "Please fill in the title"]
    },
    description:{
        type: String,
        require:[true, "Please fill in the description"]
    },
    status:{
        type: Boolean,
        default: false
    },
    deadline:{
        type: Date,
        require:[true, "Please select a date"]
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);