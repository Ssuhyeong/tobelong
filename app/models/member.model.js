module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("member_table", {
        
        // 회원 인덱스 번호
        member_idx: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // 회원 아이디
        member_id: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        // 회원 비밀번호
        member_password: {
            type: Sequelize.STRING(2000),
            allowNull: false
        },
        // 회원 등급
        member_grade: {
            type: Sequelize.STRING(100),
            allowNull: false,
            defaultValue: "user"
        },
        // 회원 프로필 이미지 이름
        member_image: {
            type: Sequelize.STRING(100)
        },
        // 회원 이메일 주소
        member_email: {
            type: Sequelize.STRING(100)
        },
        // 회원 생일
        member_birth: {
            type: Sequelize.DATE
        },
        // 회원 성별
        member_gender: {
            type: Sequelize.STRING(4)
        },
        // 회원 직업
        member_job: {
            type: Sequelize.STRING(100)
        },
        // 회원 소지 포인트
        member_point: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        // 회원가입 날짜
        member_regdate: {
            type: Sequelize.DATE
        },
        // 회원 탈퇴 여부 (기본 "N")
        member_delyn: {
            type: Sequelize.STRING(2),
            allowNull: false,
            defaultValue: "N"
        },
    },
    {
        charset: 'euckr',
        collate: 'euckr_bin',
    });

    return Member
}