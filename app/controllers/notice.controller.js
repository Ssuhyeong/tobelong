const { request, application } = require('express');

const { question, test } = require('../models');

const db = require('../models');
const Notice = db.notice;
const Member = db.member;

const analysisController = require('./analysis.controller')

// 페이지 나누기
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

// 페이지 별로 나눈 데이터
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, items, totalPages, currentPage };
};


// 페이지네이션 테스트
exports.pagination = (req, res) => {
    console.log(getPagination(3, 10))
    console.log(getPagingData({count: 100, rows: 10}, 1, 10))

    res.send({
        "getPagination": getPagination(3, 10),
        "getPagingData": getPagingData({count: 100, rows: 10}, 1, 10)
    })
}

// 테스트 목록 받아오기
exports.listGet = (req, res) => {

    // GET 방식으로 호출할 경우
    if(req.method == "GET"){

        let pageNum = 1;        // 현재 페이지 변수
        let limit = 6;          // 한 페이지에 담을 데이터 개수 변수
        let offSet = 0;         // 이전에 담았던 데이터 수

        // url에서 받아온 쿼리스트링 중에서 p(page)가 있는지 확인한 뒤, 있다면 pageNum에 넣어주기        
        if(typeof req.query['p'] != "undefined"){
            pageNum = req.query['p']
        }

        // 만일 현재 페이지(pageNum)이 1보다 크다면 offset 설정해주기
        if(pageNum > 1){
            offSet = limit*(pageNum - 1);
        }

        // 공지사항 전부 다 받아오기
        Notice.findAll({
            offset: offSet,
            limit: limit,
            where: {'notice_pubyn': 'Y',
                    'notice_delyn': 'N'},
            order: [['notice_regdate', 'DESC']]
            })

            .then((data) => {
                res.send(data)
                console.log("data: " + data)
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while retrieving admins"
                });
            });
    }

}

// 테스트 목록 받아오고 전체 개수 불러오기
exports.findAndCountAll = (req, res) => {

    // GET 방식으로 호출할 경우
    if(req.method == "GET"){
        let pageNum = 1;        // 현재 페이지 변수
        let limit = 12;          // 한 페이지에 담을 데이터 개수 변수
        let offSet = 0;         // 이전에 담았던 데이터 수

        // url에서 받아온 쿼리스트링 중에서 p(page)가 있는지 확인한 뒤, 있다면 pageNum에 넣어주기        
        if(typeof req.query['p'] != "undefined"){
            pageNum = req.query['p']
        }
        
        // 만일 현재 페이지(pageNum)이 1보다 크다면 offset 설정해주기
        if(pageNum > 1){
            offSet = limit*(pageNum - 1);
        }

        // 공지사항과 갯수 전부 다 받아오기
        Notice.findAndCountAll({
            offset: offSet,
            limit: limit,
            where: {'notice_pubyn': 'Y',
                    'notice_delyn': 'N'},
            include: {model: Member},
            order: [['notice_regdate', 'DESC']]
            })

            .then((data) => {
                res.send(data)
                console.log("data: " + data)
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while retrieving admins"
                });
            });
    }

}


// 특정 공지사항 하나 가져오기
exports.noticeContent = (req, res) => {

    // GET 방식으로 호출할 경우
    if(req.method == "GET"){
        // url 쿼리스트링으로 받은 idx
        let idx = req.query['idx']

        // notice_idx와 idx가 같은 데이터 구하기
        Notice.findAll({
            where: {'notice_idx': idx}
        })

        .then((data) => {
            res.send(data)
            console.log(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some err occurred while retrieving admins"
            })
        });
    }
}


// 공지사항 작성하기
exports.noticeWrite = async (req, res) => {

    if(req.method == "POST") {
        console.log("req.body:", req.body)

        await Notice.create({
            notice_title: req.body['notice_title'],
            notice_content: req.body['notice_content'],
            notice_writer: 1,
            notice_regdate: new Date(),
            test_pubyn: "Y",
            test_delyn: "N"
        }).then((data) => {
            res.send(data)
            console.log(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some err occurred while retrieving admins"
            })
        });
    }
}