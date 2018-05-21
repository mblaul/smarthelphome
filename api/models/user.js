const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', (next) => {
    var user = this;
    salt = bcrypt.genSaltSync(10);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

UserSchema.statics.authenticate = function (username, password, cb) {
    User.findOne({ username : username })
        .exec ((err, user) => {
            if (err) {
                return cb(err);
            } else if (!user) {
                var err = new Error('User not found');
                err.status = 401;
                return cb(err);
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (result == true) {
                    return cb(null, user);
                } else {
                    return cb();
                }
            })
        });
}

UserSchema.statics.getUser = (userid, done) => {
    this.findOne({
        'userid': userid
    }, (error, users)=>{
        if(error){
            return done(error);
        }else{
            return done(null, users);
        }
    });
}

const User = module.exports = mongoose.model('user', UserSchema);
