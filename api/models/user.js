const mongoose = require('mongoose');

var Schema = mongoose.Schema;

//User Schema
const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
});

UserSchema.statics.getUser = function(userid,done){
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
