const express = require("express");

const router = express.Router();

const rooms = require("../data")

router.get("/", (req, res) => {

    res.status(200).send({ message: "hall booking task", })


});


router.post("/create/room", (req, res) => {

    const newRoom = req.body
newRoom.roomId=rooms.length+1;


    rooms.push(newRoom);
    res.status(200).send({ message: "room booked succesfully", room: newRoom });

});


router.post("/bookingRoom", (req, res) => {
    const customer = req.body;


    rooms.map((room) => {

        if (room.roomID === customer.roomID) {


            if (room.customerDetails.date !== customer.Date&&!room.bookedStatus) {
                room.customerDetails.customerName = customer.customerName
                room.customerDetails.date = customer.Date
                room.customerDetails.startTime = customer.startTime
                room.customerDetails.endTime = customer.endTime
                room.bookedStatus = room.bookedStatus

                return res.status(201).send({ message: "succeffully room booked",  customeName:customer.customerName })
            }
            return res.status(400).send({ message: "room not vaccant" })
        }
        return room
        // return res.status(401).send({message:"rooms not found"})

    })
});

router.get("/bookedroom", (req, res) => {

    let booked = rooms.map((room) => {

        if (room.bookedStatus == true) {
            return {
                roomName: room.roomName,
                bookedStatus: "Booked",
                customerName: room.customerDetails.customerName,
                Date: room.customerDetails.date,
                startTime: room.customerDetails.startTime,
                endTime: room.customerDetails.endTime
            }
        } else {
            return { "Room name": room.roomName, "Booked Status": "available" }
        };
    })
    res.status(200).send({ message: "all  rooms are succefully retrived", rooms: booked })

})
router.get("/allcustomers", (req, res) => {


    let customers = rooms.filter((room) => {
        if (room.bookedStatus) {
            return room
        }
    }).map((room) => {

        return {
            "customer Id": room.customerDetails.customerId,
            "customer Name": room.customerDetails.customerName,
            "Room Name": room.roomName,
            "Date": room.customerDetails.date,
            "start Time": room.customerDetails.startTime,
            "End Time": room.customerDetails.endTime
        }
    })
    res.status(200).send({ "message": "These are the customer details", customers })

})



router.get("/bookedHistory/:customerId",async (req, res) => {

    let customerId = req.params.customerId;
    console.log(customerId)
    try{
        let room = rooms.find((room) => {

            if (room.bookedStatus && room.roomID == customerId) {
     return room

            }
        }
    )   

    if(room){
        res.status(200).send({message:"costomer founded",   "RoomName": room.roomName,
        "date": room.customerDetails.date,
        "startTime": room.customerDetails.startTime,
        "endTime": room.customerDetails.endTime,
        "bookingId": room.roomID + room.customerDetails,
        "bookingData": room.customerDetails.date,
        "bookingStatus": "booked"})
    }else{
        return res.status(400).send({message:"customers not found"})
    }
       
    
 
    }catch(er){
res.status(401).send({message:"internal error"})
    }
  

      
    }

    )




module.exports = router
