/**
 * Created by haner on 16/3/7.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    globalConfig = require('../config/global-config');

var db = mongoose.connect('mongodb://localhost/' + globalConfig.dbName).connection;


/**
 * DB connect test
 */
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',console.log.bind(console,'Connect Successful!!!'));


//var User = function(){
//    this.Schema = Schema;
//    this.mongoose = mongoose;
//    this.init();
//};
//
///**
// * 初始化工作
// */
//User.prototype.init = function(){
//    this.createSchema();
//    this.createModel();
//};
//
///**
// * 创建 Schema
// */
//User.prototype.createSchema = function(){
//    this.UserSchema = new this.Schema({
//        email: {
//            type:String,
//            unique:true,
//            index: true
//        },
//        username:{
//            type:String,
//            index: true
//        },
//        age:Number,
//        sex:Number
//    });
//};
//
///**
// * 创建 Model
// */
//User.prototype.createModel = function(){
//    this.User = this.mongoose.model('User',this.UserSchema);
//};


var UserSchema = new Schema({
    uid:Schema.Types.ObjectId,
    email: {
        type: String,
        index: true
    },
    username: {
        type: String,
        index: true
    },
    age: Number,
    sex: Number,
    createDate:{
        type: Date, default: Date.now
    },
    updateDate:{
        type: Date, default: Date.now
    }
},{versionKey:false});


/**
 * save 之前所做工作
 */
UserSchema.pre('save',function(next){
    if(this.isNew){
        this.createDate = this.updateDate = new Date();
    }
    else{
        this.updateDate = new Date();
    }
    next();
});


/**
 * 自定义方法 sayInfo
 * NOTE: methods must be added to the schema before compiling it with mongoose.model()
 */
UserSchema.methods.sayName = function(){
    console.log(this.username ? "My name is " + this.username : "I don't have a name");
};

module.exports = mongoose.model('UserModel',UserSchema);