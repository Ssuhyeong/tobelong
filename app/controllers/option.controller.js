const db = require('../models');
const option = db.option;

exports.optionCheck = (data) => {

    const idx = data['option_idx']

    // option_count 값 1 올리기
    option.increment('option_count', {
        option_count: 1,
        where: {option_idx: idx}
    })

    // 넘어온 데이터에 성별 체크가 되어 있다면 선택지 데이터 해당 성별 올리기
    if(data.hasOwnProperty('checkedGender')){
        if(data['checkedGender'] == "man"){
            option.increment('option_man', {
                option_man: 1,
                where: {"option_idx": idx}
            })
        }else if(data['checkedGender'] == "woman"){
            option.increment('option_woman', {
                option_woman: 1,
                where: {"option_idx": idx}
            })
        }
    }

    // 넘어온 데이터에 나이 체크가 되어 있다면 선택지 데이터 해당 연령대 올리기 
    if(data.hasOwnProperty('checkedAge')){
        if(data['checkedAge'] == 10){
            option.increment('option_teenager', {
                option_teenager: 1,
                where: {"option_idx": idx}
            })
        }else if(data['checkedAge'] == 20){
            option.increment('option_twenties', {
                option_twenties: 1,
                where: {"option_idx": idx}
            })
        }else if(data['checkedAge'] == 30){
            option.increment('option_thirties', {
                option_thirties: 1,
                where: {"option_idx": idx}
            })
        }else if(data['checkedAge'] == 40){
            option.increment('option_forties', {
                option_forties: 1,
                where: {"option_idx": idx}
            })
        }else if(data['checkedAge'] == 50){
            option.increment('option_fifties', {
                option_fifties: 1,
                where: {"option_idx": idx}
            })
        }else if(data['checkedAge'] == 60){
            option.increment('option_sixties', {
                option_sixties: 1,
                where: {"option_idx": idx}
            })
        }else if(data['checkedAge'] == 70){
            option.increment('option_seventies', {
                option_seventies: 1,
                where: {"option_idx": idx}
            })
        }
    }
}