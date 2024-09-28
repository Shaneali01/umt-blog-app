async function createToken(userid, res) {
    // Create JWT token
    const token = jwt.sign({ userid }, process.env.SECRET_KEY, { expiresIn: '7d' });

    // Update user with token in the database (optional)
    const result = await usermodel.findByIdAndUpdate(userid, { token }, { new: true });

    console.log("Updated User with Token:", result);

    // Return the token instead of setting a cookie
    return token;
}
