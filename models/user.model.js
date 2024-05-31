const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: mongoose.Types.ObjectId
    },
    username: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    password: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    bio: {
        type: String
    },
    email: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 254
    },
    isBot: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

// Hashing password before saving to database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;