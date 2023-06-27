/* eslint-disable */
const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const secretJwtKey = process.env.jwt_secret;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (v) {
                // A very basic email pattern:
                return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
                    v
                );
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    sessions: [
        {
            jwtToken: { type: String, required: true },
        },
    ],
});

//Assign JWT to User
userSchema.statics.generateAuthToken = async function (userObj) {
    const user = this;
    const token = jwt.sign({ id: userObj._id }, secretJwtKey, {
        expiresIn: 36000000,
    });
    await user.updateOne({ _id: userObj._id }, { sessions: { jwtToken: token } });

    const user_object = await user.findOne({ "sessions.jwtToken": token });

    return user_object;
};

userSchema.statics.removeToken = function (userObj) {
    const user = this;
    return user.updateOne({ _id: userObj._id }, { sessions: { jwtToken: "" } });
};

userSchema.statics.findByToken = async function (token) {
    const user = this;
    const verifyUser = jwt.verify(token, secretJwtKey);
    if (verifyUser.id) {
        const verified_user = await user.findOne({ "sessions.jwtToken": token });
        return verified_user;
    }
    return null;
};

//Verify JWt Token
userSchema.statics.checkIfTokenVerified = function (token) {
    const verifyUser = jwt.verify(token, secretJwtKey);
    return verifyUser;
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    const userJson = _.pick(userObject, ["_id", "name", "email"]);
    // userJson.roles = userObject.role_id;
    if (userObject?.sessions?.length) {
        userJson.jwtToken = userObject?.sessions[0].jwtToken;
    }
    userJson.updated_at = userObject.updatedAt;
    return userJson;
};

userSchema.plugin(timestamps);

const User = mongoose.model("User", userSchema);
module.exports = User;
