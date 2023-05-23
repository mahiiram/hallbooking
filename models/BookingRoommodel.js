const mongoose = require('mongoose');

const booking_schema =new mongoose.Schema({
    CustomerName:{
        type: String,
        required: true
    },
    Date:{
        type: Date,
        required: true,
     },
    Bookingstatus:{
        type:String,
        required:true
     },
    RoomId:[{
        type:mongoose.Types.ObjectId,
        ref:"room",
        required: true,
     }],
    StartTime:{
        type:Date,
        required: true,
     },
    Endtime:{
        type:Date,
        required: true,
    },
})

const BookingRoommodel = mongoose.model('booking',booking_schema);
module.exports = BookingRoommodel;