const express = require("express");
const bodyparser = require("body-parser");
const server = express();
const mongoose = require('mongoose');
const env = require('dotenv').config();
const cors = require('cors');
const booking_room = require("./controllers/BookingRoom");
const hallbooking_controller = require("./controllers/hallbooking");
const BookingRoommodel = require("./models/BookingRoommodel");
const HallbookingModel = require("./models/HallbookingModel");



server.use(cors())
server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended:true }))

server.use('/',hallbooking_controller);
server.use('/',booking_room)



const PORT = 5000;
server.listen(PORT,() => {
    console.log('server started', PORT);
});

mongoose.connect(process.env.DB).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})


