const booking_room = require("express").Router();
const BookingRoommodel = require("../models/BookingRoommodel");




booking_room.post("/bookroom", async (req, res, next) => {
    const { 
        CustomerName,
        Date,
        Bookingstatus,
        RoomId,
        StartTime,
        Endtime} = req.body

    let bookings;
    try {
        bookings = new BookingRoommodel({
            CustomerName,
            Date,
            Bookingstatus, 
            RoomId,
            StartTime,
            Endtime
        })
        bookings = await bookings.save();
    } catch (err) {
        return console.log(err)
    }
    if(!bookings){
        return res.status(500).json({
           message:"Error while Booking a Room"
        })
    }
     return res.status(200).json({
        bookings,
        message:"Room Booked Successfully"
     })
})

//getallrooms with roomName
booking_room.get("/getallrooms",async  (req,res,next)=>{
      
     let bookingroom;
      try{
        bookingroom = await BookingRoommodel.find().populate({
           path:'RoomId',
           select:'hallname'
        })
      }catch(err){
        return console.log(err)
      }
      if(!bookingroom){
        return res.status(500).json({
            message:"unexpected error"
        })
      }

    return res.status(200).json({
        bookingroom,
        message:"Room data fetched successfully"
    })
})
//list all the customes with booked data
booking_room.get("/getrooms",async  (req,res,next)=>{
      
    let bookingroom;
     try{
       bookingroom = await BookingRoommodel.aggregate([
        {
            $project:{CustomerName:1 ,
                Date:1,
                RoomId:1,
                StartTime:1,
                Endtime:1}
        }
       ])
     }catch(err){
       return console.log(err)
     }
     if(!bookingroom){
       return res.status(500).json({
           message:"unexpected error"
       })
     }

   return res.status(200).json({
       bookingroom,
       message:"Room data fetched successfully"
   })
})




module.exports = booking_room