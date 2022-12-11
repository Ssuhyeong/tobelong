const db = require('../models');
const analysis = db.analysis;


// 특정 테스트와 연결된 통계 결과 데이터 추가하기
exports.analysisPost = (idx) => {

    analysis.create({
        test_idx: idx
    })

}

// 특정 테스트 통계 결과 추가하기
exports.analysisCheck = (data) => {

    const idx = data['test_idx']

    analysis.increment('analysis_count', {
        analysis_count: 1,
        where: {"test_idx": idx}
    })

    // 넘어온 데이터에 성별 체크가 되어 있다면 통계 데이터 해당 성별 올리기
    if(data.hasOwnProperty('checkedGender')){
        if(data['checkedGender'] == "man"){
            analysis.increment('analysis_man', {
                analysis_man: 1,
                where: {"test_idx": idx}
            })
        }else if(data['checkedGender'] == "woman"){
            analysis.increment('analysis_woman', {
                analysis_woman: 1,
                where: {"test_idx": idx}
            })
        }
    }

    // 넘어온 데이터에 나이 체크가 되어 있다면 통계 데이터 해당 연령대 올리기 
    if(data.hasOwnProperty('checkedAge')){
        if(data['checkedAge'] == 10){
            analysis.increment('analysis_teenager', {
                analysis_teenager: 1,
                where: {"test_idx": idx}
            })
        }else if(data['checkedAge'] == 20){
            analysis.increment('analysis_twenties', {
                analysis_twenties: 1,
                where: {"test_idx": idx}
            })
        }else if(data['checkedAge'] == 30){
            analysis.increment('analysis_thirties', {
                analysis_thirties: 1,
                where: {"test_idx": idx}
            })
        }else if(data['checkedAge'] == 40){
            analysis.increment('analysis_forties', {
                analysis_forties: 1,
                where: {"test_idx": idx}
            })
        }else if(data['checkedAge'] == 50){
            analysis.increment('analysis_fifties', {
                analysis_fifties: 1,
                where: {"test_idx": idx}
            })
        }else if(data['checkedAge'] == 60){
            analysis.increment('analysis_sixties', {
                analysis_sixties: 1,
                where: {"test_idx": idx}
            })
        }else if(data['checkedAge'] == 70){
            analysis.increment('analysis_seventies', {
                analysis_seventies: 1,
                where: {"test_idx": idx}
            })
        }
    }
}


// 테스트 공유 횟수 체크하기
exports.shareCheck = async (data) => {

    const idx = data['test_idx']
    const shareChannel = data['shareChannel']
    
    let channel = ""
    if(shareChannel === "link"){
        channel = "share_link"

    }else if(shareChannel === "kakao"){
        channel = "share_kakao"
    }

    analysis.increment(
        {
            [channel]: 1,
            share_all: 1,              
        },
        {
            where: {test_idx: idx}
        }
    );
}