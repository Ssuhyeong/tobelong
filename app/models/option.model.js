module.exports = (sequelize, Sequelize) => {
    const Option = sequelize.define("option_table", {
        option_idx: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        question_idx: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        test_idx: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        option_content: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        option_descript: {
            type: Sequelize.STRING(500)
        },
        // 선택지 이미지 이름
        option_image: {
            type: Sequelize.STRING(100)
        },
        option_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        option_man: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        option_woman: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        option_teenager: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        option_twenties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        option_thirties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        option_forties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        option_fifties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        option_sixties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        option_seventies: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
      charset: 'euckr',
      collate: 'euckr_bin'
    });

    return Option;
}