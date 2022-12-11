const db = require('../models');
const option = db.option;
const worldcup = db.worldcup;
const test = db.test;

const testController = require('./test.controller')
const analysisController = require('./analysis.controller')

// 이상형 월드컵 결과 올려주기
exports.worldcupCheck = (data) => {

    console.log("\n\n\n\n\n\n\n\n\n\n\ntest_idx:", data[0].test_idx)

    testController.testCheck({test_idx: data[0].test_idx})
    analysisController.analysisCheck({test_idx: data[0].test_idx})

    // 이상형월드컵 사용되었던 선택지들 통계값 올려주기
    for(let i = 0 ; i < data.length ; i++){
        worldcup.increment(
            {
                'worldcup_count': data[i].worldcup_partInNum,
                'worldcup_win':  data[i].worldcup_winNum,
                'worldcup_champion': data[i].worldcup_champion,
                'worldcup_compare': data[i].worldcup_compare,
            }, 
            {
                where: { "worldcup_idx": data[i].worldcup_idx }
            }
        );
    }
}