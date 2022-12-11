const db = require('../models');
const User = db.user;


exports.ParentFind = async (userid) => {

    const alluser = await User.findAll({
        attributes: [
            'id',
            'userid',
            'buytype',
            'sponsorId',
            'sponsorCount',
            'parentSponsorId',
            'level',
            'left',
            'right'
        ],
        raw: true,
        logging:false
    });

    var alluserMap = {};
    var id;
    for (let i = 0; i < alluser.length; i++) {
        alluserMap[alluser[i].id] = alluser[i];

        if(userid === alluser[i].userid)
        {
            id = alluser[i].id
        }

    }

    var tempUser = alluserMap[id]

    
    if(tempUser.id === 0 )
    {
        //console.log('default admin user')
        return {count:0,arr:[]}
    }
    else if(tempUser.parentSponsorId === 0 )
    {
        //console.log('root user ')
        return {count:0,arr:[]}
    }
    else
    {
       
        var arr =[]
        while (true) {

            //console.log('tempUser',tempUser)
    
            if(tempUser.parentSponsorId === 0 ) break
            tempUser = alluserMap[tempUser.parentSponsorId]
            arr.push(tempUser)

            
        }

        return {count:arr.length,arr:arr}
    }
    
    //console.log('----------------- end')
};
