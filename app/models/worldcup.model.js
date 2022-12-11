module.exports = (sequelize, Sequelize) => {
    const Worldcup = sequelize.define("worldcup_table", {
        worldcup_idx: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        test_idx: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        worldcup_content: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        // 선택지 이미지 이름
        worldcup_image: {
            type: Sequelize.STRING(100)
        },
        // 경쟁한 횟수
        worldcup_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        // 테스트 한번 들어간 횟수
        worldcup_compare: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        worldcup_win: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        worldcup_champion: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        // option_man: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0
        // },
        // option_woman: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0
        // },
        // option_teenager: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0
        // },
        // option_twenties: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0
        // },
        // option_thirties: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0
        // },
        // option_forties: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0
        // },
        // option_fifties: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0
        // },
        // option_sixties: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0
        // },
        // option_seventies: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0
        // }
    },
    {
      charset: 'euckr',
      collate: 'euckr_bin'
    });

    return Worldcup;
}