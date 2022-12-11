const controller = require("../controllers/notice.controller");

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


  app.get("/api/notice/list", controller.listGet);                      // 공지사항 전체 목록 불러오기(카테고리 별 포함)
  app.get("/api/notice/noticeContent", controller.noticeContent);           // 공지사항 상세 내역 가져오기
  app.get("/api/notice/noticeList", controller.findAndCountAll)           // 공지사항 전체 목록 불러오고, 총 개수 확인하기
  
  app.post("/api/notice/noticeWrite", controller.noticeWrite)               // 테스트 새로 작성하기
  
};
