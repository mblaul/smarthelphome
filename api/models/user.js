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
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.statics.getUser = (userid,done) => {
    this.findOne({
        'userid': userid
    }, (error, users)=>{
        if(error){
            return done(error);
        }else{
            return done(null, users);
        }
    })
}

const User = module.exports = mongoose.model('users', UserSchema);
