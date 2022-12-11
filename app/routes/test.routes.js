const controller = require("../controllers/test.controller");

const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './app/uploads')
  },
  filename: function (req, file, cb){
    cb(null,  file.originalname)
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


  app.get("/api/test/list", controller.listGet);                      // 테스트 전체 목록 불러오기(카테고리 별 포함)
  app.get("/api/test/testDetail", controller.testDetail);             // 테스트 인트로 불러오기
  app.get("/api/test/testContent", controller.testContent);           // 테스트 상세 내역 가져오기
  app.post("/api/test/testResult", controller.testCheck);             // 테스트 결과 가져오기
  app.get("/api/test/popularList", controller.popular);               // 인기 상위 6개 테스트 가져오기
  app.get("/api/test/testList", controller.findAndCountAll)           // 테스트 전체 목록 불러오고, 총 개수 확인하기
  app.get("/api/test/testListOrder", controller.findAndCountAll)           // 테스트 정렬 순서 별 전체 목록 불러오고, 총 개수 확인하기
  
  app.post("/api/test/testWrite", upload.fields([{name: 'test_thumbnail'}, {name:"option_image"}, {name:"result_image"}]), controller.testWrite)             // 테스트 새로 작성하기
  
  app.post("/api/test/worldcupWrite", upload.fields([{name: 'test_thumbnail'}, {name:"option_image"}]), controller.worldcupWrite);                           // 이상형 월드컵 새로 작성하기
  app.post("/api/test/worldcupCheck", controller.worldcupCheck);

  app.post("/api/test/rankingTestWrite", upload.fields([{name: 'test_thumbnail'}, {name:"option_image"}]), controller.rankingTestWrite);                           // 이상형 월드컵 새로 작성하기
  app.post("/api/test/rankingTestCheck", controller.rankingTestCheck);

  app.get("/api/test/shareCheck", controller.shareCheck)       // 테스트 공유 횟수 체크
  app.get("/api/test/likeCheck", controller.likeCheck)         // 테스트 좋아요

  app.post("/api/test/test", upload.fields([{name: "image"}]), controller.test);

  
};
