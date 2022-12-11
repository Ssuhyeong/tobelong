const controller = require("../controllers/result.controller");

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: '../uploads'})

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

  app.post("/api/result/resultList", upload.single('test_image'), controller.resultList);
  app.get("/api/result/resultList", controller.resultList);
  app.post("/api/result/resultCheck", controller.resultCheck)
};
