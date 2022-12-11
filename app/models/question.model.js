module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("question_table", {
        
        // 질문 인덱스 번호
        question_idx: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // 해당 질문이 속한 테스트 인덱스 번호
        test_idx: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // 질문 내용
        question_content: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        // 질문 상세 설명
        question_descript: {
            type: Sequelize.STRING(500)
        }
    },
    {
      charset: 'euckr',
      collate: 'euckr_bin'
    });

    return Question
}