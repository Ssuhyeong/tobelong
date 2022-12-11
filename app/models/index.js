const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.test = require("../models/test.model.js")(sequelize, Sequelize);
db.question = require("../models/question.model.js")(sequelize, Sequelize);
db.option = require("../models/option.model.js")(sequelize, Sequelize);
db.worldcup = require("../models/worldcup.model.js")(sequelize, Sequelize);

db.result = require("../models/result.model.js")(sequelize, Sequelize);
db.analysis = require("../models/analysis.model.js")(sequelize, Sequelize);
db.notice = require("../models/notice.model.js")(sequelize, Sequelize);
db.member = require("../models/member.model.js")(sequelize, Sequelize);
db.like = require("../models/like.model.js")(sequelize, Sequelize);
// db.rankingTitle = require("../models/rankingTitle.model")(sequelize, Sequelize);
// db.rankingOption = require("../models/rankingOption.model")(sequelize, Sequelize);


// Relations
db.test.hasMany(db.question, {foreignKey: 'test_idx'});
db.test.hasMany(db.worldcup, {foreignKey: 'test_idx'});
db.test.hasMany(db.like, {foreignKey: 'test_idx'});
db.question.hasMany(db.option, {foreignKey: 'question_idx'});

// db.test.hasMany(db.rankingTitle, {foreignKey: 'test_idx'});
// db.test.hasMany(db.rankingOption, {foreignKey: 'test_idx'});

db.notice.belongsTo(db.member, {foreignKey: 'notice_writer', sourceKey: 'member_idx'});
db.result.belongsTo(db.test, {foreignKey:"test_idx"})

module.exports = db;
