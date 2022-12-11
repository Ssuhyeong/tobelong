const db = require('../models');
const result = db.result;
const Test = db.test;

const analysisController = require('./analysis.controller')
const testController = require('./test.controller')
const optionController = require('./option.controller')

// 특정 테스트 통계 수정하기
exports.resultCheck = async (data) => {

    console.log("data:")
    console.log(data)

    let compareKey = ""         // DB의 result_descript 값과 비교할 값 변수
    // 만일 test_category가 2(선호도 테스트)라면 test_descript가 number 형식으로 왔을 것이기 때문에 toString을 통해 String 타입으로 바꿔준다.
    if(data['test_category'] == 2){
        compareKey = data['test_descript'].toString()
    }else if(data['test_category'] == 3){
        compareKey = data["test_descript"]
    }

    let idx = "";       // 결과 인덱스 넣을 변수
    // 현재 테스트 선택에 따른 결과 값 찾기
    await result.findOne({
        where: {
            test_idx: data['test_idx'],
            result_descript: compareKey
        }
    }).then((data) => {
        idx = data['result_idx']

    }).catch((err) => {
        res.status(500).send({
            message:
                err.message ||
                "Some err occurred while retrieving admins"
        })
    })

    // result_count값 1 높여주기
    result.increment('result_count', {
        result_count: 1,
        where: {result_idx: idx}
    }).then(


    )
    
    // 넘어온 데이터에 성별 체크가 되어 있다면 결과 데이터 해당 성별 올리기
    if(data.hasOwnProperty('checkedGender')){
        if(data['checkedGender'] == "man"){
            console.log("checkedGender:", data['checkedGender'], "idx:", idx)
            result.increment('result_man', {
                result_man: 1,
                where: {
                    "result_idx": idx,
                    "result_descript": compareKey 
                }
            })
        }else if(data['checkedGender'] == "woman"){
            result.increment('result_woman', {
                result_woman: 1,
                where: {
                    "result_idx": idx,
                    "result_descript": compareKey
                }
            })
        }
    }

    // 넘어온 데이터에 나이 체크가 되어 있다면 결과 데이터 해당 연령대 올리기 
    if(data.hasOwnProperty('checkedAge')){
        if(data['checkedAge'] == 10){
            result.increment('result_teenager', {
                result_teenager: 1,
                where: {
                    "result_idx": idx,
                    "result_descript": compareKey
                }
            })
        }else if(data['checkedAge'] == 20){
            result.increment('result_twenties', {
                result_twenties: 1,
                where: {
                    "result_idx": idx,
                    "result_descript": compareKey
                }
            })
        }else if(data['checkedAge'] == 30){
            result.increment('result_thirties', {
                result_thirties: 1,
                where: {
                    "result_idx": idx,
                    "result_descript": compareKey
                }
            })
        }else if(data['checkedAge'] == 40){
            result.increment('result_forties', {
                result_forties: 1,
                where: {
                    "result_idx": idx,
                    "result_descript": compareKey
                }
            })
        }else if(data['checkedAge'] == 50){
            result.increment('result_fifties', {
                result_fifties: 1,
                where: {
                    "result_idx": idx,
                    "result_descript": compareKey
                }
            })
        }else if(data['checkedAge'] == 60){
            result.increment('result_sixties', {
                result_sixties: 1,
                where: {
                    "result_idx": idx,
                    "result_descript": compareKey
                }
            })
        }else if(data['checkedAge'] == 70){
            result.increment('result_seventies', {
                result_seventies: 1,
                where: {
                    "result_idx": idx,
                    "result_descript": compareKey
                }
            })
        }
    }
}

// 특정 테스트 결과 가져오기
exports.resultList = (req, res) => {

    if(req.method == "GET"){

        const idx = req.query['test_idx']

        result.findAll({
            where: {
                test_idx: idx
            },
            include: {model: Test}
        }).then((data) => {
            res.send(data)
            console.log(data)
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some err occurred while retrieving admins"
            })
        });
    }

    // POST 방식으로 호출할 경우
    else if(req.method == "POST"){
        
        // request를 통해 받은 JSON 파일 담을 변수
        const data = req.body

        console.log("post data:", data)

        analysisController.analysisCheck(data)
        testController.testCheck(data)
        
        // test_category가 2(선호도 테스트)면 option과 result 각각 결과 1 추가
        // test_category가 3(성격 유형 검사)이면 result만 1 추가
        if(data['test_category'] == 2){
            this.resultCheck(data)
            optionController.optionCheck(data)

        }else if(data['test_category'] == 3){
            this.resultCheck(data)
        }

        result.findAll({
            where: {
                test_idx: data['test_idx']
            }
        }).then((data) => {
            res.send(data)
            // console.log(data)
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some err occurred while retrieving admins"
            })
        });

    }
}