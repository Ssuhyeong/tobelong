module.exports = (sequelize, Sequelize) => {
    const Result = sequelize.define("result_table", {
        result_idx: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        test_idx: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        result_title: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        result_content: {
            type: Sequelize.STRING(2000),
            allowNull: false
        },
        result_descript: {
            type: Sequelize.STRING(500)
        },
        result_image: {
            type: Sequelize.STRING(100)
        },
        result_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        result_man: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        result_woman: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        result_teenager: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        result_twenties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        result_thirties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        result_forties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        result_fifties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        result_sixties: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        result_seventies: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
      charset: 'euckr',
      collate: 'euckr_bin'
    });

    return Result;
}