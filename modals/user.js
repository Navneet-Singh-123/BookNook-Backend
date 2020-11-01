const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1')

const userSchema = new mongoose.Schema({
    name: {type: String, trim: true, requried: true, maxlength: 32},
    email: {type: String, trim: true, requried: true, unique: true},
    hashed_password: {type: String, requried: true},
    about: {type: String, trim: true}, 
    salt: String, 
    role: {type: Number, default: 0}, 
    history: {type: Array, default: []}
}, {timestamps: true})  

// Virtual Fields (Derived Attributes)
userSchema.virtual('password')
.set(function(password){
    // password coming from the client side 
    // _password is the temporary field which is made equal to the password coming 
    this._password = password;

    // Gives a random string which will be used to hash the password and store it in its field
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
})
.get(function(){
    return this._password;
})

userSchema.methods = {
    encryptPassword: function(password){
        if(!password){
            return '';
        }
        try{
            return crypto.createHmac('sha1', this.salt)
                            .update(password)
                            .digest('hex')
        }   
        catch(err){
            return '';
        }
    }
}

module.exports = mongoose.model('User', userSchema);