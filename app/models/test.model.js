module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define("test_table", {
        
        // 테스트 인덱스 번호
        test_idx: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // 테스트 제목
        test_title: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        // 테스트 내용
        test_content: {
            type: Sequelize.STRING(2000),
            allowNull: false
        },
        // 테스트 썸네일 이미지 이름
        test_image: {
            type: Sequelize.STRING(100)
        },
        // 테스트 작성자 회원 인덱스 번호
        test_writer: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // 테스트 작성 날짜
        test_regdate: {
            type: Sequelize.DATE
        },
        // 테스트 카테고리 번호
        test_category: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // 테스트 공개 여부 (기본 "Y")
        test_pubyn: {
            type: Sequelize.STRING(2),
            allowNull: false,
            defaultValue: "Y"
        },
        // 테스트 삭제 여부 (기본 "N")
        test_delyn: {
            type: Sequelize.STRING(2),
            allowNull: false,
            defaultValue: "N"
        },
        // 테스트 참여 인원 카운트 (테스트를 실제 끝까지 수행한 인원) 
        test_join: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        // 테스트 조회 인원 카운트 (테스트 글에 단순히 들어온 인원)
        test_view: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        // 테스트 공유 카카오 카운트 (카카오 공유하기를 통해 공유한 사람들)
        test_like: {
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
        
    },
    {
        charset: 'euckr',
        collate: 'euckr_bin',
    });

    return Test
}