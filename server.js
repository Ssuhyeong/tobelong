const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// 정적(static) 파일 경로 설정
const app = express();
app.use(express.static("./app/uploads"))
app.use(express.static("./uploads"))

var corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3003",
    "http://localhost:3002",
    "http://15.164.142.181:3000",
    "http://15.164.142.181",
  ]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
// const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   //initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to api server" });
});


require('./app/routes/test.routes')(app)
require('./app/routes/result.routes')(app)
require('./app/routes/notice.routes')(app)
require('./app/routes/member.route')(app)


// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`);
});

