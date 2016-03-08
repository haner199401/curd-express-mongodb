var express = require('express');
var router = express.Router();
var UserCtrl = require('../controller/user-ctrl');

/* GET users listing. */
router.get('/', UserCtrl.getList); //列表
router.get('/add/page', UserCtrl.addUserPage); //添加页面
router.post('/add/user', UserCtrl.addUser);//添加用户
router.get('/user/:id', UserCtrl.findOne);
router.get('/del/user/:id', UserCtrl.delUser);

module.exports = router;
