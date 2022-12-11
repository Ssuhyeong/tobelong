module.exports = (sequelize, Sequelize) => {
    const Notice = sequelize.define("notice_table", {
        
        // 공지사항 인덱스 번호
        notice_idx: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // 공지사항 제목
        notice_title: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        // 공지사항 내용
        notice_content: {
            type: Sequelize.STRING(2000),
            allowNull: false
        },
        // 공지사항 작성자 회원 인덱스 번호
        notice_writer: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // 공지사항 작성 날짜
        notice_regdate: {
            type: Sequelize.DATE
        },
        // 공지사항 공개 여부 (기본 "Y")
        notice_pubyn: {
            type: Sequelize.STRING(2),
            allowNull: false,
            defaultValue: "Y"
        },
        // 공지사항 삭제 여부 (기본 "N")
        notice_delyn: {
            type: Sequelize.STRING(2),
            allowNull: false,
            defaultValue: "N"
        },
    },
    {
        charset: 'euckr',
        collate: 'euckr_bin',
    });

    return Notice
}