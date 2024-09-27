const jwt = require('jsonwebtoken');
const usermodel = require('./Models/UserModel');

async function createToken(userid, res) {
    // Create JWT token
    const token = jwt.sign({ userid }, process.env.SECRET_KEY, { expiresIn: '7d' });

    // Set the JWT as a cookie
    res.cookie('jwt', token, {
        httpOnly: false, 
        secure: true, 
        sameSite: 'None', // Valid values: 'Strict', 'Lax', or 'None'
        domain:'https://umt-blog-app.vercel.app',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });

    // Update user with token in the database (optional)
    const result = await usermodel.findByIdAndUpdate(userid, { token }, { new: true });

    console.log("Updated User with Token:", result);

    // Return the token
    return token;
}

module.exports = { createToken };
