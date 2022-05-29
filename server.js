require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const transactions = require("./transactions");

//imports for file uploads
const bodyParser = require('body-parser');
const crypto = require('crypto');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
///

const path = require("path")
const UserController = require("./controllers/userController")
const TripController = require("./controllers/tripController")

const app = express();
const PORT = process.env.PORT ?? 4000;
const mongoURI = process.env.MONGO_URI;
// const db = mongoose.connection;

mongoose.connect(mongoURI, {}, () => {
    console.log("Connected~")
})

///////////////////IMAGE UPLOAD CODE///////////////////////////
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  // res.json({ file: req.file });
  res.redirect('/');
});

app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @desc Display Image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});
///////////////////////////////////////////////////////////////

// middleware for image uploads
app.use(bodyParser.json());
app.use(methodOverride('_method'));



////

app.use(express.json());
app.use("/api/users", UserController);
app.use("/api/trips", TripController);
app.use(express.static("./frontend/build"))

app.get("/api/hi", (req, res) => {
  res.json({ msg: "Hello World" });
});

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

app.post("/api/posts", verifyToken, (req, res) => {
  const username = jwt.verify(req.headers.token, process.env.TOKEN_SECRET).user;
  console.log("USERNAME",username)
  //const userTransactions = transactions[username];
  //res.status(200).json({ transactions: userTransactions });
  res.status(200).json({ 'username': username });
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
