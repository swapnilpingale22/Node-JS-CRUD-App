const jwt = require("jsonwebtoken");
const secret = "Swapnil"

function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
        secret
    );
};

function getUser(token) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
    }
};
module.exports = {
    setUser,
    getUser,
};