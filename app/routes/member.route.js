const controller = require("../controllers/member.controller");
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './app/uploads')
  },
  filename: function (req, file, cb){
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );


    next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.get("/api/member/me", controller.me);
  app.get("/api/member/test", controller.test);
  app.post("/api/member/signUp", upload.fields([{name: "profile"}]), controller.signUp);
  app.get("/api/member/idCheck", controller.idCheck);
  app.get("/api/member/ipCheck", controller.ipCheck);
  app.get("/api/member/signIn", controller.signIn);

  app.post('/api/member/profilechange', upload.fields([{name: "profile"}]), controller.profileChange);
  app.post("/api/member/modify", controller.modify)
  app.post("/api/member/changepassword", controller.changepassword);
};
