const db = require('../models');
const config = require('../config/auth.config');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const requestIp = require('request-ip');
const saltRound = 10;

const Member = db.member;

// uuid에 해당하는 회원 정보를 반환한다.
exports.me = async (req, res) => {
  console.log('me');
  try {
      const { authorization } = req.headers;

      if (!authorization) {
          return res.status(401).send({
              message: 'Authorization token missing',
          });
      }

      const accessToken = authorization.split(' ')[1];
      // console.log(accessToken, config);

      const { userId } = jwt.verify(accessToken, config.secret);
      console.log('userId', userId);

      const user = await Member.findOne({
          where: { member_id: userId },
          raw: true,
          logging: false,
      });

      if (!user) {
          return res
              .status(400)
              .send({ message: 'Invalid authorization token' });
      }
      // console.log('user', user);
      return res.send({
          user: {
            member_idx: user.member_idx,
            member_id: user.member_id,
            // member_name: user.member_name,
            member_email: user.member_email,
            member_birth: user.member_birth,
            member_point: user.member_point,
            member_grade: user.member_grade,
            member_image: user.member_image,
            member_gender: user.member_gender,
          }
      });
  } catch (err) {
      console.error(err);
      return res.status(500).send({
          message: 'Internal server error',
      });
  }
};

// 회원 가입
exports.signUp = (req, res) => {

  // POST 방식으로 호출할 경우
  if(req.method == "POST"){

    console.log("\n\n\n\n\n\n\n\n\n", req.files, "\n\n\n\n\n\n\n\n\n\n\n\n")

    let data = JSON.parse(req.body['data'])

    console.log("data:", data)

    let member = {
      "member_id": data["member_id"],
      "member_password": data["member_password"],
      "member_image": data['member_image'],
      "member_email": data['member_email'],
      "member_birth": data['member_birth'],
      "member_job": data['member_job'],
      "member_gender": data['member_gender'],
    }

    // bcrypt 라이브러리 이용해서 비밀번호 해쉬화 하는 과정
    bcrypt.genSalt(saltRound, (err, salt) => {
      if(err){
        return res.status(500).json({registerSuccess: false, mesage: "비밀번호 해쉬화에 실패앴습니다."});
      }

      bcrypt.hash(member['member_password'], salt, async (err, hash) => {
        if (err) {
          return res.status(500).json({ registerSuccess: false, message: "비밀번호 해쉬화에 실패했습니다."});
        }

        // 앞서 설정한 member json의 member_password값을 해쉬된 값으로 대체
        member["member_password"] = hash
        
        // 회원 데이터 등록
        Member.create(
          member
        ).then((data) => {
            res.send("signUpComplete")
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some err occurred while retrieving admins"
            })
        });
      })
    })
  }
}

// id 중복검사
exports.idCheck = async (req, res) => {

  // GET 방식으로 호출할 경우
  if(req.method == "GET"){

    const id = req.query['id']

    // Member.count를 통해 찾아본 결과 1이면 이미 있는 아이디 0이면 없는 아이디
    await Member.count({
      where: {"member_id": id}
    }).then((count) => {
      res.send(count.toString())
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message ||
            "Some err occurred while retrieving admins"
      })
    })
  }
}

exports.test = (req, res) => {
  console.log("member controller 연결 이상 무")
}

// 로그인
exports.signIn = (req, res) => {

  // GET 방식으로 호출할 경우
  if(req.method == "GET"){

    const memberId = req.query['member_id']
    const memberPwd = req.query['member_password']

    try {
      // 로그인 한 아이디가 실제 DB에 있는 아이디인지 찾아보기
      Member.findOne({
        where: {'member_id': memberId },
      
      }).then((user) => {
        // 아이디를 Member 안에서 찾았는데 값이 없는 경우
        if(!user){
          return res
            .status(400)
            .send({ message: 'Please check your userid and password' });

        // 아이디가 같은 데이터가 있으면 비밀번호 비교해보기
        }else{
          // bcrypt 라이브러리를 통해 해쉬화된 값 비교
          bcrypt.compare(memberPwd, user.member_password, (err, checkResult) => {
            if(!checkResult){
              return res
                .status(400)
                .send({ message: 'Invalid password' });
            }else{
              const accessToken = jwt.sign({ userId: user.member_id }, config.secret, {expiresIn: 86400,});
          
              return res.send({
                accessToken,
                user: { // 로그인 완료 후 반환하는 사용자 정보
                    member_idx: user.member_idx,
                    member_id: user.member_id,
                    // member_name: user.member_name,
                    member_image: user.member_image,
                    member_email: user.member_email,
                    member_birth: user.member_birth,
                    member_point: user.member_point,
                    member_grade: user.member_grade,
                    member_image: user.member_image,
                    member_gender: user.member_gender,
                },
              });
            }
          })
        }
      }).catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some err occurred while retrieving admins"
        })
      })
    }catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }
}

exports.ipCheck = async (req, res) => {

  // GET 방식으로 호출할 경우
  if(req.method == "GET"){
    const ip = requestIp.getClientIp(req)
    console.log("ip:", ip)
  }
}

// 회원 프로필 이미지 변경
exports.updateProfile = async (req, res) => {
  const { member_idx, avatar } = req; 
  console.log("req:", req)
  const user = await Member.findOne({
      where: { member_idx: member_idx },
      raw: true,
  });

  if (!user) {
      let data = {
          status: 500,
          message:
              err.message || "Invalid authorization token"
        }
        return data;

  } else {
      // update user
      await Member.update(
          { member_image: avatar },
          { where: { member_idx: member_idx } }
      )
      .then( num => {
          console.log('num',num);
          return {
              num: num 
          };
      })
      .catch( err => {
          return {
              status: 500,
              user: {
                      member_idx: user.member_idx,
                      member_image: avatar,
              },
              message: err.message 
          }
      })
  }
};

// 프로필 이미지 파일 업로드 라우트
exports.profileChange = async (req, res) => {

  try {
      if (!req.files) {
          res.send({
              status: false,
              message: '파일 업로드 실패'
          });
      } else {
          let idx = req.body.member_idx;
          let file = req.files.profile[0];
          // let fileName = trim(file.name); // 파일명 공백을 제거한다.
          // let newFileName = fileName.replace(/ /gi,"-"); // 공백문자를 "-"로 대체한다.
          let avatar = req.files.profile[0].filename;

          await Member.update(
            { member_image: avatar },
            { where: { member_idx: idx } }
          )
          .then( num => {
            console.log('profile이 업데이트 되었습니다.' , num);
            
            res.send({
              status: true,
              message: '파일이 업로드 되었습니다.',
              data: {
                  size: file.size,
                  member_image: avatar,
              }
            });
          })
          .catch( err => {
              return {
                  status: 500,
                  user: {
                          member_idx: idx,
                          member_image: avatar,
                  },
                  message: err.message 
              }
          })
      }
  } catch (err) {
      res.status(500).send(err);
  }
}

// 회원정보 업데이트
exports.modify = async (req, res) => {

  const { authorization } = req.headers;

  if (!authorization) {
      return res.status(401).send({
          message: 'Authorization token missing',
      });
  }

  const accessToken = authorization.split(' ')[1];
  console.log(accessToken);

  // jwt 라이브러리를 통해 유저 아이디 찾기
  const { userId } = jwt.verify(accessToken, config.secret);

  // Member 테이블에서 해당 유저 찾기
  const user = await Member.findOne({
      where: { member_id: userId },
      raw: true,
  });

  // 만일 유저가 존재하지 않는다면 메시지 보내기
  if (!user) {
      return res.status(400).send({ message: 'Invalid authorization token' });

  // 유저가 존재한다면 회원 정보 수정하기
  } else {
      const { email, birth } = req.body;
      // update user
      await Member.update(
          { member_email: email, member_birth: birth },
          { where: { member_id: userId } }
      ).then(data => {
        console.log("data:", data)
      });

      return res.send({
          accessToken: accessToken,
          user: {
            member_idx: user.member_idx,
            member_id: user.member_id,
            member_image: user.member_image,
            member_email: email,
            // member_email: user.member_email,
            // member_birth: user.member_birth,
            member_birth: birth,
            member_point: user.member_point,
            member_grade: user.member_grade,
            member_image: user.member_image,
            member_gender: user.member_gender,
          },
      });
  }
};

// 회원 비밀번호 변경
exports.changepassword = async (req, res) => {
  console.log('account changepassword', req.body);

  const { authorization } = req.headers;

  if (!authorization) {
      return res.status(401).send({
          message: 'Authorization token missing',
      });
  }

  const accessToken = authorization.split(' ')[1];
  const { userId } = jwt.verify(accessToken, config.secret);
  console.log(userId)
  const user = await Member.findOne({
      where: { member_id: userId },
      raw: true,
  });

  if (!user) {
      return res.status(400).send({ message: 'Invalid authorization token' });
  } else {
      const { password } = req.body;
      // update user

      bcrypt.genSalt(saltRound, (err, salt) => {
        if(err){
          return res.status(500).json({registerSuccess: false, mesage: "비밀번호 해쉬화에 실패앴습니다."});
        }
  
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            return res.status(500).json({ registerSuccess: false, message: "비밀번호 해쉬화에 실패했습니다."});
          }
          
          const hashedPwd = hash
          // 비밀번호 해쉬된 값 대체
          await Member.update(
            { member_password: hashedPwd }, 
            { where: { member_id: userId } }
          ).then((data) => {
            return res.send({ accessToken: accessToken, message: 'Password change success', data:data});
          })
          .catch((err) => {
              res.status(500).send({
                  message:
                      err.message ||
                      "Some err occurred while retrieving admins"
              })
          });
        })
      })
  }
};