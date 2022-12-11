module.exports = {
  HOST: "sothecode.cmboljoqtwt9.ap-northeast-2.rds.amazonaws.com",
  USER: "sothecode",
  PASSWORD: "s0thec0de12!@",
  DB: "tobelong_db",
  dialect: "mysql",
  timezone: '+09:00',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};