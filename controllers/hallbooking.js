const hallbooking_controller = require("express").Router();
const HallbookingModel = require("../models/HallbookingModel");

hallbooking_controller.get("/",  (req,res,next)=>{
    res.status(200).json({
        message:"hallbooking server started"
    })
})

hallbooking_controller.post('/createroom', async (req,res,next)=>{
    console.log(req.body)
   const {
    hallname,
    numberofseatsavailable,
    amentities,
    priceforanhour,
   } = req.body;
   
   let newroom;

   try{
     newroom = new HallbookingModel({
        hallname,
        numberofseatsavailable,
        amentities,
        priceforanhour
     });
       newroom =await newroom.save()
   }catch(err){
    return console.log(err)
   }
     if(!newroom){
        return res.status(500).json({
            message:"error occured while creating hall "
        })
     }
     return res.status(200).json({
        newroom
     })
   
     
});  


hallbooking_controller.get("/getroomsdata",  (req,res,next)=>{
    HallbookingModel.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err)
    })
})

// updateone


hallbooking_controller.patch('/updateroom', (req,res,next)=>{
    // console.log(req.body)
   const {
    Hallname,
    NumberofseatsAvailable,
    amentities,
    priceforanhour,
    roomnumber
   } = req.body;

   HallbookingModel.updateOne({
    _id:id}, 
    {
    $set:{
        Hallname,
        NumberofseatsAvailable,
        amentities,
        priceforanhour,
        roomnumber
    }
   }).then((response)=>{
     if(response && response.acknowledged && response.modifiedCount===1){
        return res.status(200).json({
            success:true,
            message:"Student updated Sucessfully",
            response,
        })
     }else {
         return res.status(500).json({
            success:false,
            message:"error occured while updating a student",
            response,
        });
    }
}).catch((error)=>{
    res.status(400).json({
       success: false,
       message:"BAD REQUEST",
       error: error,
    })
})
})

module.exports = hallbooking_controller;