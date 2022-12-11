const { request, application } = require('express');

const { question, test, option } = require('../models');

const db = require('../models');
const Test = db.test;
const Question = db.question;
const Option = db.option;
const Result = db.result;
const Worldcup = db.worldcup;
const RankingTitle = db.rankingTitle;
const RankingOption = db.rankingOption;
const Like = db.like;
const Analysis = db.analysis;

const analysisController = require('./analysis.controller')
const worldcupController = require('./worldcup.controller')

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
        // url 쿼리 스트링에서 받아올 테스트 카테고리 변수
        let testCategory = 0

        let pageNum = 1;        // 현재 페이지 변수
        let limit = 6;          // 한 페이지에 담을 데이터 개수 변수
        let offSet = 0;         // 이전에 담았던 데이터 수

        // url에서 받아온 쿼리스트링 중에서 c(category)가 있는지 확인한 뒤, 있다면 testCategory에 넣어주기
        if(typeof req.query['c'] != "undefined"){
            testCategory = req.query['c']
        }

        // url에서 받아온 쿼리스트링 중에서 p(page)가 있는지 확인한 뒤, 있다면 pageNum에 넣어주기        
        if(typeof req.query['p'] != "undefined"){
            pageNum = req.query['p']
        }

        
        
        // 만일 현재 페이지(pageNum)이 1보다 크다면 offset 설정해주기
        if(pageNum > 1){
            offSet = limit*(pageNum - 1);
        }

        console.log("bf typeof: " + typeof req.query['c'] != "undefined")

        console.log("bf testCategory: " + req.query['c'])
        console.log("af testCategory: " + testCategory)
        console.log("af pageNum: " + pageNum)
        console.log("af offSet: " + offSet)

        // testCategory가 기본값인 경우(즉, 따로 카테고리 설정을 하지 않은 경우) 테스트 전부 다 받아오기
        if(testCategory == 0){
            Test.findAll({
                offset: offSet,
                limit: limit,
                where: {'test_pubyn': 'Y',
                        'test_delyn': 'N'},
                order: [['test_regdate', 'DESC']]
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
        }else {
            Test.findAll({
                offset: offSet,
                limit: limit,
                where: {'test_pubyn': 'Y',
                        'test_delyn': 'N',
                        'test_category': testCategory},
                order: [['test_regdate', 'DESC']]
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

}

// 테스트 목록 받아오고 전체 개수 불러오기
exports.findAndCountAll = (req, res) => {

    // GET 방식으로 호출할 경우
    if(req.method == "GET"){
        // url 쿼리 스트링에서 받아올 테스트 카테고리 변수
        let testCategory = 0
        let orderStandard = "test_regdate"
        let ipAddress = ""

        let pageNum = 1;        // 현재 페이지 변수
        let limit = 6;          // 한 페이지에 담을 데이터 개수 변수
        let offSet = 0;         // 이전에 담았던 데이터 수

        // url에서 받아온 쿼리스트링 중에서 c(category)가 있는지 확인한 뒤, 있다면 testCategory에 넣어주기
        if(typeof req.query['c'] != "undefined"){
            testCategory = req.query['c']
        }

        // url에서 받아온 쿼리스트링 중에서 p(page)가 있는지 확인한 뒤, 있다면 pageNum에 넣어주기        
        if(typeof req.query['p'] != "undefined"){
            pageNum = req.query['p']
        }

        if(typeof req.query['o'] != "undefined"){
            orderStandard = req.query['o']
        }

        // url에서 받아온 쿼리스트링 중에서 ip가 있는지 확인한 뒤, 있다면 ipAddress에 넣어주기
        if(typeof req.query['ip'] != "undefined"){
            ipAddress = req.query['ip']
        }

        
        
        // 만일 현재 페이지(pageNum)이 1보다 크다면 offset 설정해주기
        if(pageNum > 1){
            offSet = limit*(pageNum - 1);
        }

        // testCategory가 기본값인 경우(즉, 따로 카테고리 설정을 하지 않은 경우) 테스트 전부 다 받아오기
        if(testCategory == 0){
            Test.findAndCountAll({
                offset: offSet,
                limit: limit,
                where: {'test_pubyn': 'Y',
                        'test_delyn': 'N'},
                include: {model: Like, where: {"ip_address": ipAddress}, required: false},
                order: [[orderStandard, 'DESC']]
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
        }else {
            Test.findAndCountAll({
                offset: offSet,
                limit: limit,
                where: {'test_pubyn': 'Y',
                        'test_delyn': 'N',
                        'test_category': testCategory},
                include: {model: Like, where: {"ip_address": ipAddress}, required: false},
                order: [['test_regdate', 'DESC']]
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

}

// 최근 인기 테스트 상위 6개 가져오기
exports.popular = (req, res) => {

    // GET 방식으로 호출할 경우
    if(req.method == "GET"){

        let ip = req.query['ip']
        
        // test_pub이 Y인 것과 test_delyn이 N인 것들을 test_join을 기준으로 내림차순으로 가져오기
        Test.findAll({
            where: {'test_pubyn': 'Y',
                    'test_delyn': 'N'},
            include: {model: Like, where: {"ip_address": ip}, required: false},
            order: [['test_join', 'DESC']],
            limit: 6
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

// 특정 테스트 하나 가져오기
exports.testDetail = (req, res) => {

    // GET 방식으로 호출할 경우
    if(req.method == "GET"){
        // url 쿼리스트링으로 받은 idx
        let idx = req.query['idx']
        // url에서 받아온 쿼리스트링 중에서 ip가 있는지 확인한 뒤, 있다면 ipAddress에 넣어주기
        if(typeof req.query['ip'] !== "undefined"){
            ip = req.query['ip']
        }
        
        this.testView({test_idx: idx})

        // test_idx와 idx가 같은 데이터 구하기
        Test.findAll({
            where: {'test_idx': idx},
            include: {model: Like, where: {"ip_address": ip}, required: false}
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

// 특정 테스트 질문, 선택지 내용 가져오기
exports.testContent = (req, res) => {

    console.log("req.method:", req.method)
    let include = {}
    if(req.query.category === "4"){
        include = {model:Worldcup}
    }else if(req.query.category === "5"){
        include = [{model: RankingTitle}, {model: RankingOption}]
    }else{
        include = {model:Question, include: {model:Option}}
    }
    
    // GET 방식으로 호출할 경우
    if(req.method == "GET"){
        // url 쿼리스트링으로 받은 idx
        const idx = req.query['idx']
        
        Test.increment('test_view', {
            test_view: 1,
            where: {'test_view': idx}
        })

        Test.findAll({
            where: {"test_idx": idx},
            include: include
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
    
    // POST 방식으로 가져올 경우(이상형 월드컵 결과 확인 시 사용)
    }else if(req.method == "POST"){
        console.log("req.body:", req.body)
        
        // body로 받은 idx
        const idx = req.body['test_idx']
        
        testController.testCheck({test_idx: idx})
        
        Test.findAll({
            where: {"test_idx": idx},
            include: include
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

exports.test = (req, res) => {

    if(req.method == "GET"){

    }else if(req.method == "POST"){
        const data = req.body
        console.log(req.files)
        // console.log(req)
        
    }

}

// 테스트 참여인원 업데이트
exports.testCheck = (data) => {

    const idx = data['test_idx']
    console.log("testCheck, idx: " + idx + "\n")

    Test.increment('test_join', {
        test_join: 1,
        where: {"test_idx": idx}
    });

}

// 테스트 조회수 업데이트
exports.testView = (data) => {
    const idx = data['test_idx']
    console.log("testCheck, idx: " + idx + "\n")

    Test.increment('test_view', {
        test_view: 1,
        where: {"test_idx": idx}
    });
}

// 테스트 작성하기
exports.testWrite = async (req, res) => {

    if(req.method == "POST") {


        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nreq:", req + "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
        
        const data = JSON.parse(req.body['data'])
        // 테스트 데이터 추가하기
        await Test.create({
            test_title: data['title']['test_title'],
            test_content: data['title']['test_content'],
            test_image: data['title']['test_thumbnail'],
            // test_image: req.files.test_thumbnail[0].filename,
            test_writer: 1,
            test_regdate: new Date(),
            test_category: data['title']['test_category'],
            test_pubyn: "Y",
            test_delyn: "N"
        }).then((data) => {
            res.send(data)
            console.log("createdTest:", data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some err occurred while retrieving admins"
            })
        });


        // 최근에 저장한 테스트 인덱스 번호 가져오기
        let idx = "";       // 금방 저장한 테스트의 인덱스 번호
        await Test.findOne({
            limit: 1,
            order: [['test_regdate', 'DESC']]
        }).then((data) => {
            idx = data.test_idx
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some err occurred while retrieving admins"
            })
        });
        console.log("idx: " + idx)

        // 해당 테스트에 대한 통계 데이터 만들어주기
        analysisController.analysisPost(idx)

        // 질문 데이터 생성하는 반복문 실행
        for(let i = 0 ; i < data['question'].length ; i++){

            console.log("i 가져오기: " + i)
            console.log(data['question'][i])

            // i번째 질문에 descript값이 있다면 받아오기
            let descript = ""
            if(data['question'][i].hasOwnProperty('descript')){
                descript = data['question'][i]['descript'];
            }

            // i번째 질문 생성하기
            await Question.create({
                test_idx: idx,
                question_content: data['question'][i]['question'],
                question_descript: descript

            }).then((data) => {
                console.log(data)
            })

            // 해당 질문에 해당하는 선택지 저장하는 반복문 실행
            let optionNum = 1
            while(data['question'][i].hasOwnProperty(('answer' + optionNum))){
                // 최근에 저장한 질문 인덱스 번호 가져오기
                let questionIdx = "";       // 금방 저장한 질문의 인덱스 번호
                await Question.findOne({
                    limit: 1,
                    order: [['question_idx', 'DESC']]
                }).then((data) => {
                    questionIdx = data.question_idx
                })

                console.log("questionIdx: " + questionIdx)

                // 선택지에 대한 descript값이 있다면 받아오기
                let optionDescript = ""
                if(data['question'][i].hasOwnProperty('answer' + optionNum) + "_descript"){
                    optionDescript = data['question'][i]['answer' + optionNum + "_descript"]
                }

                // 선택지에 대한 이미지가 있다면 받아오기
                let optionImage = ""
                if(data['question'][i].hasOwnProperty('image' + optionNum)){
                    optionImage = data['question'][i]['image' + optionNum]
                }

                // 선택지 데이터 생성하기
                await Option.create({
                    question_idx: questionIdx,
                    test_idx: idx,
                    option_content: data['question'][i]['answer' + optionNum],
                    option_descript: optionDescript,
                    option_image: optionImage
    
                }).then((data) => {
                    console.log(data)
                })

                optionNum++
            }
    
        }

        let optionList = []
        await Option.findAndCountAll({
            where:{'test_idx': idx}
        }).then((data) => {
            data.rows.map((testData) => {
                optionList.push(testData.dataValues.option_idx)
            })
        })

        console.log("\n\n\n\n\n\n\n\n\n\nresult:", data['result'], "\n\n\n\n\n\n\n\n\n\n\n\n\n\n")

        // 질문에 대한 결과 내용 저장하는 반복문 실행
        let resultNum = 1
        while(data['result'].hasOwnProperty('result_title_' + resultNum)){

            // 결과에 대한 descript값이 있다면 받아오기
            let resultDescript = ""
            if(data['result'].hasOwnProperty('result_descript_' + resultNum)){
                resultDescript = data['result']['result_descript_' + resultNum]
            }

            // 결과에 대한 이미지가 있다면 받아오기
            let resultImage = ""
            if(data['result'].hasOwnProperty('result_img_' + resultNum)){
                resultImage = data['result']['result_img_' + resultNum]
            }

            console.log("\n\n\n\n\n\n\nresultImage:", resultImage, "\n\n\n\n\n\n\n\n")

            // 만일 test_category가 3이라면(성격유형검사) 실행
            if(data['title']['test_category'] === 3){
                await Result.create({
                    test_idx: idx,
                    result_title: data['result']['result_title_' + resultNum],
                    result_content: data['result']['result_content_' + resultNum],
                    result_descript: resultDescript,
                    result_image: resultImage

                }).then((data) => {
                    console.log(data)
                })

            // 만일 test_category가 2라면(선호도 테스트) 실행
            }else if(data['title']['test_category'] === 2){
                await Result.create({
                    test_idx: idx,
                    result_title: data['result']['result_title_' + resultNum],
                    result_content: data['result']['result_content_' + resultNum],
                    result_descript: optionList[(resultNum-1)],
                    result_image: resultImage

                }).then((data) => {
                    console.log(data)
                })
            }

            resultNum++
        }


    }
}

// 이상형 월드컵 작성하기
exports.worldcupWrite = async (req, res) => {

    if(req.method == "POST") {

        const data = JSON.parse(req.body['data'])
        await Test.create({
            test_title: data['title']['test_title'],
            test_content: data['title']['test_content'],
            test_image: data['title']['test_thumbnail'],
            test_writer: 1,
            test_regdate: new Date(),
            test_category: data['title']['test_category'],
            test_pubyn: "Y",
            test_delyn: "N"

        }).then((data) => {
            res.send(data)
            console.log("createdTest:", data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some err occurred while retrieving admins"
            })
        });


        // 최근에 저장한 테스트 인덱스 번호 가져오기
        let idx = "";       // 금방 저장한 테스트의 인덱스 번호
        await Test.findOne({
            limit: 1,
            order: [['test_regdate', 'DESC']]
        }).then((data) => {
            idx = data.test_idx
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some err occurred while retrieving admins"
            })
        });
        console.log("idx: " + idx)

        // 해당 테스트에 대한 통계 데이터 만들어주기
        analysisController.analysisPost(idx)

        // 해당 월드컵에 들어가는 옵션 목록
        for(let i = 0 ; i < data['option'].length ; i++){
            await Worldcup.create({
                test_idx: idx,
                worldcup_content: data['option'][i].option,
                worldcup_image: data['option'][i].image,
            }).then((data) => {
                console.log(data)
            })
        }
    }
}

// 이상형 월드컵 결과 체크하기
exports.worldcupCheck = async (req, res) => {
    if(req.method == "POST"){
        const data = req.body
        
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\nworldcup data:", req.body, "\n\n\n\n\n\n\n\n\n\n\n\n\n")
        
        worldcupController.worldcupCheck(data)
    }
}

// 등급 테스트 작성하기
exports.rankingTestWrite = async (req, res) => {
    
    if(req.method == "POST") {

        // const data = JSON.parse(req.body['data'])
        const data = req.body['data']
        
        await Test.create({
            test_title: data['title']['test_title'],
            test_content: data['title']['test_content'],
            test_image: data['title']['test_thumbnail'],
            test_writer: 1,
            test_regdate: new Date(),
            test_category: data['title']['test_category'],
            test_pubyn: "Y",
            test_delyn: "N"

        }).then((data) => {
            res.send(data)
            console.log("createdTest:", data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some err occurred while retrieving admins"
            })
        });


        // 최근에 저장한 테스트 인덱스 번호 가져오기
        let idx = "";       // 금방 저장한 테스트의 인덱스 번호
        await Test.findOne({
            limit: 1,
            order: [['test_regdate', 'DESC']]
        }).then((data) => {
            idx = data.test_idx
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some err occurred while retrieving admins"
            })
        });

        // 해당 테스트에 대한 통계 데이터 만들어주기
        analysisController.analysisPost(idx)

        // 해당 테스트에 들어갈 등급 등록
        for(let i = 0 ; i < data['ranking'].length ; i++){
            await RankingTitle.create({
                test_idx: idx,
                ranking_title: data['ranking'][i].ranking_title,
                ranking_option_num: data['ranking'][i].ranking_option_num,
            }).then((data) => {
                console.log(data)
            })
        }

        // 해당 테스트에 들어갈 선택지 등록
        for(let i = 0 ; i < data['option'].length ; i++){
            await RankingOption.create({
                test_idx: idx,
                ranking_option_title: data['option'][i].option,
                ranking_option_image: data['option'][i].image,
            }).then((data) => {
                console.log(data)
            })
        }
    }

}

// 등급 테스트 등수 확인하기
exports.rankingTestCheck = async (req, res) => {
    const data = req.body['data']

    const ranking = [
        "ranking_option_first",
        "ranking_option_second",
        "ranking_option_third",
        "ranking_option_fourth",
        "ranking_option_fifth",
        "ranking_option_sixth",
        "ranking_option_seventh",
        "ranking_option_eighth",
        "ranking_option_ninth",
        "ranking_option_tenth",
        "ranking_option_eleventh",
        "ranking_option_twelfth",
        "ranking_option_thirteenth",
        "ranking_option_fourteenth",
        "ranking_option_fifteenth",
    ]

    for(let i = 0 ; i < data.length ; i++){
        RankingOption.increment(
            {
                [ranking[i]]: 1,
            }, 
            {
                where: { "ranking_option_idx": data[i].ranking_option_idx }
            }
        )
    }
}

// 테스트 공유 횟수 체크하기
exports.shareCheck = async (req, res) => {

    console.log("req:", req.query)

    if(req.method == "GET"){
        const data = req.query

        const idx = data['test_idx']
        const shareChannel = data['shareChannel']
        
        let channel = ""
        if(shareChannel === "link"){
            channel = "share_link"

        }else if(shareChannel === "kakao"){
            channel = "share_kakao"
        }

        Test.increment(
            {
                [channel]: 1,
                share_all: 1,              
            },
            {
                where: {test_idx: idx}
            }
        );

        analysisController.shareCheck({test_idx: idx, shareChannel: shareChannel})
    }
}

// 테스트 좋아요 누르기
exports.likeCheck = async (req, res) => {

    if(req.method == "GET"){
        const data = req.query

        const idx = Number(data['idx'])
        const ip = data['ip']
        
        console.log("idx:", idx, "ip:", ip)

        Like.create({
            test_idx: idx,
            ip_address: ip,
        })

        Test.increment(
            {
                test_like: 1,              
            },
            {
                where: {test_idx: idx}
            }
        );

        Analysis.increment(
            {
                analysis_like: 1,              
            },
            {
                where: {test_idx: idx}
            }
        );
    }
}

