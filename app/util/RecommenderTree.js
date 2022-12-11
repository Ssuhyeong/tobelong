const db = require('../models');
const User = db.user;
var RecommenderInfo = require('./RecommenderInfo');

exports.RecommenderTree = async (id) => {
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
            'recommenderId',
            'recommenderCount',
            'parentRecommenderId',
            'regdate',
           
        ],
        raw: true,
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

                recommenderId: alluser[i].recommenderId,
                recommenderCount: alluser[i].recommenderCount,
                parentRecommenderId: alluser[i].parentRecommenderId,
                regdate: alluser[i].regdate,
                
            }
        }

        // first children 
        if (alluser[i].parentRecommenderId == id) {
            firstChildren.push({
                id: alluser[i].id,
                userid:alluser[i].userid,
                username: alluser[i].name,
                name: alluser[i].userid,
                title: alluser[i].userid,
                buytype:alluser[i].buytype,
                bonus:alluser[i].bonus,
                balance:alluser[i].balance,
                recommenderId: alluser[i].recommenderId,
                recommenderCount: alluser[i].recommenderCount,
                parentRecommenderId: alluser[i].parentRecommenderId,
                regdate: alluser[i].regdate,
                
            });
        }

        // parentId == 0 는 root node 
        // parentId 가 있는 node 는 children node 다 
        if (alluser[i].parentRecommenderId > 0) {
            childrenNodes.push({
                id: alluser[i].id,
                userid:alluser[i].userid,
                username: alluser[i].name,
                name: alluser[i].userid,
                title: alluser[i].userid,
                buytype:alluser[i].buytype,
                bonus:alluser[i].bonus,
                balance:alluser[i].balance,
                recommenderId: alluser[i].recommenderId,
                recommenderCount: alluser[i].recommenderCount,
                parentRecommenderId: alluser[i].parentRecommenderId,
                regdate: alluser[i].regdate,
               
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
                recommenderId: alluser[i].recommenderId,
                recommenderCount: alluser[i].recommenderCount,
                parentRecommenderId: alluser[i].parentRecommenderId,
                regdate: alluser[i].regdate,
              
            });
        }
    }

    //console.log('first children ',firstChildren)

    if (firstChildren.length > 0) {

        //console.log('first children ','111111111111111111')
        let a = new RecommenderInfo(childrenNodes, id);
        await a.getChilden(id,1);


        let recommenderInfo = await a.getInfo();
        return { currentuser, recommenderInfo };

    } else {
        //console.log('first children ','2222222222222')
        return { currentuser, recommenderInfo: null };
    }
};
