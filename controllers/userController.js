const express = require("express");
const router = express.Router();
const User = require("../models/Users")
const jwt = require("jsonwebtoken");

router.get("/seed", async (req,res) => {
    const userDetails = [
        {
          username: "Joy Kwok",
          email: "hi123@gmail.com",
          password: "88888",
        },
        {
          username: "Ivan Leong",
          email: "hi345@gmail.com",
          password: "88888",
        },
      ];
      await User.deleteMany({});
      await User.insertMany(userDetails);
      res.json(userDetails);
});

router.post("/register", async (req, res) => {
    const body = req.body;

    const createdUser = await User.create(req.body);
    // const salt = await bcrypt.genSalt(10);
    createdUser.save().then(() => res.status(200).send("Success"));

})

router.post("/login", async (req, res) => {
    console.log("body", req.body);
    const { username, password } = req.body;
    const findUserName = await User.findOne({ username: req.body.username });
    console.log("username found",findUserName) 

    if (password === findUserName.password) {
      //authenticate and create the jwt
      const newToken = jwt.sign(
        {
          user: username,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: 60 * 60 }
      );
  
      res
         .status(200)
         .cookie("NewCookie", newToken, { path: "/" , httpOnly: true })
         .send({"jwt":newToken});
    } else {
      res.status(403).send("unauthorised");
    }
  });



module.exports = router;