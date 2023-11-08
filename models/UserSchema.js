var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        index: {
            unique: true
        },
        required: true
    },

    email: {
        type: String
    }, 

    password: {
        type: String,
        required: true
    },

    wallet_data: {
        type: String
    },
    
    customer_id: {
        type: String,
    },

    wallet: {
        type: String,
    },

    created_at: {
        type: Date,
        required: true
    },

    updated_at: {
        type: Date,
        required: true
    },
    
    last_login: Date
})

UserSchema.methods.comparePassword = function (input, callback) {
    bcrypt.compare(input, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);