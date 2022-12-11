module.exports = (sequelize, Sequelize) => {
    const Analysis = sequelize.define("analysis_table", {
        analysis_idx: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        analysis_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        analysis_man: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        analysis_woman: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        analysis_teenager: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        analysis_twenties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        analysis_thirties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        analysis_forties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        analysis_fifties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        analysis_sixties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        analysis_seventies: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        test_idx: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        analysis_like: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        // 테스트 공유 전체 카운트 (방법 불문 공유한 모든 사람들)
        share_all: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        // 테스트 공유 링크 카운트 (링크 복사하기를 통해 공유한 사람들)
        share_link: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        // 테스트 공유 카카오 카운트 (카카오 공유하기를 통해 공유한 사람들)
        share_kakao: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    });

    return Analysis
}