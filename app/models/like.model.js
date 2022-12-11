module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("like_table", {
      // 좋아요 인덱스 번호
      like_idx: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      // 테스트 인덱스 번호
      test_idx: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      // 테스트 내용
      ip_address: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
  },
  {
    charset: 'euckr',
    collate: 'euckr_bin'
  });

  return Like
}