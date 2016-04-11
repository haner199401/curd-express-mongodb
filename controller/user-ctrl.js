/**
 * Created by haner on 16/3/7.
 */

var UserModel = require('../model/user');
var Q = require('q');

var UserCtrl = {};

/**
 * 获取用户列表
 */
UserCtrl.getList = function (req, res) {
    UserModel.find({}).exec(function (err, users) {
        res.render('user/list', {
            title: '列表',
            users: users
        });
    });
};


/**
 * 添加用户页面
 */
UserCtrl.addUserPage = function (req, res) {
    res.render('user/add', {title: '添加用户',user:{}})
};


/**
 * 添加用户接口
 */
UserCtrl.addUser = function (req, res) {
    req.body._id ? UserModel.findOneAndUpdate({_id:req.body._id},req.body,function(err, obj){

        if (err) console.log(err);
        res.redirect('/users')
    }) :UserModel.create(req.body, function (err, obj) {
        if (err) console.log(err);
        res.redirect('/users')
    });

};


/**
 * 删除用户
 */
UserCtrl.delUser = function (req, res) {
    var query = UserModel.remove({_id:req.params.id});
    console.log(query.exec());
    res.redirect('/users')
};


/**
 * 查找用户
 */
UserCtrl.findOne = function (req, res) {
    //- 不包含该字段 项目现在为后台渲染页面,所以不存在暴露字段的隐患.若为 API 接口时 需要注意
    UserModel.findById(req.params.id, '-createDate -updateDate', function (err, user) {
        if (err) console.log(err); //redirect 操作
        res.render('user/add', {
            title: user.username + '的信息如下:',
            user:user
        });
    });
};



module.exports = UserCtrl;