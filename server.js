require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const users = require("./users");
const transactions = require("./transactions");

const path = require("path")
const UserController = require("./controllers/userController")

const app = express();
const PORT = process.env.PORT ?? 4000;
const mongoURI = process.env.MONGO_URI;
// const db = mongoose.connection;
mongoose.connect(mongoURI, {}, () => {
    console.log("Connected~")
})

app.use(express.json());
app.use("/api/users", UserController);
app.use(express.static("./frontend/build"))

app.get("/api/hi", (req, res) => {
  res.json({ msg: "Hello World" });
});

/*
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (users[username].password === password) {
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
       .send("cookie");
  } else {
    res.status(403).send("unauthorised");
  }
});
*/

/*
const { username, password } = req.body;
  console.log(username, password);
  if (username === "admin" && password === "admin") {
    const payload = { username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token: token });
  } else {
    res.status(403).json({ msg: "Invalid credentials" });
  }

*/

const verifyToken = (req, res, next) => {
  try {
    const authToken = req.headers.token;

    // validate the token
    const decoded = jwt.verify(authToken, process.env.TOKEN_SECRET);

    // if valid, retrieve the username from the token
    const username = decoded.data;

    req.user = username;

    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

app.post("/api/posts", verifyToken, (req, res) => {
  const username = req.user;
  const userTransactions = transactions[username];
  res.status(200).json({ transactions: userTransactions });
});

app.post("/api/logout", (req,res) => {
    res.clearCookie("NewCookie").send("cookie dead");
});

app.get("/*", (req,res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
})

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
