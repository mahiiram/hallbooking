const mongoose = require('mongoose');

const hall_schema =new mongoose.Schema({
    hallname:{
        type:String,
        required:true,
        ref:"booking"
    },
    numberofseatsavailable:{
        type: Number,
        required: true
    },
    amentities:{
        type: Array,
        required: true,
     },
    priceforanhour:{
        type: Number,
        required: true
    }
})
const HallbookingModel = mongoose.model('room',hall_schema);
module.exports = HallbookingModel;