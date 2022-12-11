const db = require('../models');
const User = db.user;
var SponsorInfo = require('./SponsorInfo');
var moment = require('moment');

exports.SponsorTree = async (id,tinfo) => {
    //console.log('SponsorTree',id)

    var rootNodes = [];
    var childrenNodes = [];

    var firstChildren = [];
    var currentuser = {};

    const alluser = await User.findAll({
        attributes: [
            'id',
            'userid',
            'name',
            'buytype',
            'bonus',
            'balance',
            'sponsorId',
            'sponsorCount',
            'parentSponsorId',
            'level',
            'regdate',
            'createdAt'
        ],
        raw: true,
        logging:false
    });


    for (let i = 0; i < alluser.length; i++) {


        // root node
        if (alluser[i].id == id) {
            currentuser = {
                id: alluser[i].id,
                userid:alluser[i].userid,
                username: alluser[i].name,
                name: alluser[i].userid,
                title: alluser[i].userid,
                buytype:alluser[i].buytype,
                bonus:alluser[i].bonus,
                balance:alluser[i].balance,
                sponsorId: alluser[i].sponsorId,
                sponsorCount: alluser[i].sponsorCount,
                parentSponsorId: alluser[i].parentSponsorId,
                level:alluser[i].level,
                regdate: alluser[i].regdate,
                createdAt: alluser[i].createdAt,
            }
        }

        // first children 
        if (alluser[i].parentSponsorId == id) {
            firstChildren.push({
                id: alluser[i].id,
                userid:alluser[i].userid,
                username: alluser[i].name,
                name: alluser[i].userid,
                title: alluser[i].userid,
                buytype:alluser[i].buytype,
                bonus:alluser[i].bonus,
                balance:alluser[i].balance,
                sponsorId: alluser[i].sponsorId,
                sponsorCount: alluser[i].sponsorCount,
                parentSponsorId: alluser[i].parentSponsorId,
                regdate: alluser[i].regdate,
                createdAt: alluser[i].createdAt,
            });
        }

        // parentId == 0 는 root node 
        // parentId 가 있는 node 는 children node 다 
        if (alluser[i].parentSponsorId > 0) {
            childrenNodes.push({
                id: alluser[i].id,
                userid:alluser[i].userid,
                username: alluser[i].name,
                name: alluser[i].userid,
                title: alluser[i].userid,
                buytype:alluser[i].buytype,
                bonus:alluser[i].bonus,
                balance:alluser[i].balance,
                sponsorId: alluser[i].sponsorId,
                sponsorCount: alluser[i].sponsorCount,
                parentSponsorId: alluser[i].parentSponsorId,
                level:alluser[i].level,
                regdate: alluser[i].regdate,
                createdAt: alluser[i].createdAt,
            });
        } else {
            // root node
            rootNodes.push({
                id: alluser[i].id,
                userid:alluser[i].userid,
                username: alluser[i].name,
                name: alluser[i].userid,
                title: alluser[i].userid,
                buytype:alluser[i].buytype,
                bonus:alluser[i].bonus,
                balance:alluser[i].balance,
                sponsorId: alluser[i].sponsorId,
                sponsorCount: alluser[i].sponsorCount,
                parentSponsorId: alluser[i].parentSponsorId,
                regdate: alluser[i].regdate,
                createdAt: alluser[i].createdAt,
            });
        }
    }

    //console.log('first children ',firstChildren)

    if (firstChildren.length > 0) {

        var tempSumWeekBalance = 0
        var tempWeekSSilcheokUserId = ''
        // 소실적인 존재한다. 
        if(firstChildren.length===2)
        {

            if(tinfo != undefined )
                console.log('tinfo',tinfo)

                
            
            var tempSumWeekBalance1 = 0
            var tempSumWeekBalance2 = 0

            let a1 = new SponsorInfo(childrenNodes, firstChildren[0].id,tinfo);
            await a1.getChilden(firstChildren[0].id,1);
            let sponsorinfo1 = await a1.getSponsorInfo();


            if(tinfo != undefined )
            {
                var weeknumber = moment(tinfo, "YYYY-MM-DD").isoWeek();
                if(firstChildren[0].buytype === 'new')
                {
                    var tempweeknumber = moment(firstChildren[0].regdate, "YYYY-MM-DD").isoWeek();

                    if(tempweeknumber === weeknumber)
                    {
                        tempSumWeekBalance1 = sponsorinfo1.sumWeekBalance + firstChildren[0].balance
                    }
                    else
                    {
                        tempSumWeekBalance1 = sponsorinfo1.sumWeekBalance
                    }

                }
                else
                {

                    tempSumWeekBalance1 = sponsorinfo1.sumWeekBalance
                }

                //console.log(currentuser.userid+' 자식 1의 자식들 sumWeekBalance1',tempSumWeekBalance1)
            }
            

            let a2 = new SponsorInfo(childrenNodes, firstChildren[1].id,tinfo);
            await a2.getChilden(firstChildren[1].id,1);
            let sponsorinfo2 = await a2.getSponsorInfo();
            if(tinfo != undefined )
            {
                var weeknumber = moment(tinfo, "YYYY-MM-DD").isoWeek();
                if(firstChildren[1].buytype === 'new')
                {
                    var tempweeknumber = moment(firstChildren[1].regdate, "YYYY-MM-DD").isoWeek();

                    if(tempweeknumber === weeknumber)
                    {
                        tempSumWeekBalance2 = sponsorinfo2.sumWeekBalance + firstChildren[1].balance
                    }
                    else
                    {
                        tempSumWeekBalance2 = sponsorinfo2.sumWeekBalance
                    }

                }
                else
                {

                    tempSumWeekBalance2 = sponsorinfo2.sumWeekBalance
                }

                //console.log(currentuser.userid+' 자식 2의 자식들 sumWeekBalance2',tempSumWeekBalance2)
            }


            if(tinfo != undefined )
            {
                var weeknumber = moment(tinfo, "YYYY-MM-DD").isoWeek();

                if(tempSumWeekBalance1 === tempSumWeekBalance2)
                {
    
                    if(firstChildren[0].regdate === firstChildren[1].regdate)
                    {
                        console.log(currentuser.userid+'의 '+weeknumber+' 주 소실적 ('+firstChildren[1].userid+') sumWeekBalance2',tempSumWeekBalance2)
                        tempSumWeekBalance = tempSumWeekBalance2
                        tempWeekSSilcheokUserId = firstChildren[1].userid
                    }
                    else if(firstChildren[0].regdate>firstChildren[1].regdate)
                    {
                        console.log(currentuser.userid+'의'+weeknumber+' 주 소실적 ('+firstChildren[0].userid+') sumWeekBalance1',tempSumWeekBalance1)
                        tempSumWeekBalance = tempSumWeekBalance1
                        tempWeekSSilcheokUserId = firstChildren[0].userid
                    }
                    else if(firstChildren[0].regdate<firstChildren[1].regdate)
                    {
                        console.log(currentuser.userid+'의'+weeknumber+' 주 소실적 ('+firstChildren[1].userid+') sumWeekBalance2',tempSumWeekBalance2)
                        tempSumWeekBalance = tempSumWeekBalance2
                        tempWeekSSilcheokUserId = firstChildren[1].userid
                    }
    
                }
                else if(tempSumWeekBalance1 > tempSumWeekBalance2)
                {
                    console.log(currentuser.userid+'의'+weeknumber+' 주 소실적 ('+firstChildren[1].userid+') sumWeekBalance2',tempSumWeekBalance2)
                    tempSumWeekBalance = tempSumWeekBalance2
                    tempWeekSSilcheokUserId = firstChildren[1].userid
                }
                else if(tempSumWeekBalance1 < tempSumWeekBalance2)
                {
                    console.log(currentuser.userid+'의'+weeknumber+' 주 소실적 ('+firstChildren[0].userid+') sumWeekBalance1',tempSumWeekBalance1)
                    tempSumWeekBalance = tempSumWeekBalance1
                    tempWeekSSilcheokUserId = firstChildren[0].userid
                }

            }

            
            

        }
        
        let a = new SponsorInfo(childrenNodes, id,tinfo);
        await a.getChilden(id,1);


        let sponsorinfo = await a.getSponsorInfo();

        //console.log(sponsorinfo)
        var tempsum = currentuser.balance + sponsorinfo.sumBalance
        var totalCount = 1 + sponsorinfo.length

        return { totalCount:totalCount,currentuser, sponsorinfo ,silcheok:tempsum,weekssilcheok:tempSumWeekBalance,weekssilcheokuserid:tempWeekSSilcheokUserId ,fchildrenCount:firstChildren.length};

    } else {
        //console.log('first children ','2222222222222')
        return { totalCount:1,currentuser, sponsorinfo: null,silcheok:currentuser.balance,weekssilcheok:0,weekssilcheokuserid:'',fchildrenCount:0 };
    }
};
