const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip")
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
      const authToken = req.headers.token;
  
      // validate the token
      const decoded = jwt.verify(authToken, process.env.TOKEN_SECRET);
      console.log("DECODED",decoded)
      // if valid, retrieve the username from the token
      const username = decoded.data;
  
      req.user = username;
  
      next();
    } catch (error) {
      res.sendStatus(403);
    }
  };


router.get("/seed", async (req,res) => {
    const tripDetails = [
        {
            tripIndex: 1,
            location: "Korea",
            startDate: "2022-05-30",
            endDate: "2022-06-15",
            activity: "holiday tour",
            photos: ["https://images.unsplash.com/photo-1545670584-7d9ae6de4b8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                        "https://images.unsplash.com/photo-1549221428-3f4410ea193a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"],
            public: true,
        },
        {
            tripIndex: 2,
            location: "Taiwan",
            startDate: "2022-06-31",
            endDate: "2022-07-15",
            activity: "school expedition",
            photos: ["https://images.unsplash.com/photo-1545670584-7d9ae6de4b8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                        "https://images.unsplash.com/photo-1549221428-3f4410ea193a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"],
            public: false,
        },
      ];
      await Trip.deleteMany({});
      await Trip.insertMany(tripDetails);
      res.json(tripDetails);
});

router.get("/:id", verifyToken, async (req, res) => {
    const singleTripDetail = await Trip.findOne({ tripIndex: req.params.id});
    console.log("trip details found",singleTripDetail)
    res.status(200).send(singleTripDetail);
  });

module.exports = router;