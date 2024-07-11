const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");
const register = async (req, res) => {
var { name, email, password, confirmPassword } = req.body;
if (password != confirmPassword) {
throw new BadRequestError(
"Please provide same confirm Password and password"
);
}
const user = await User.create({ name, email, password, confirmPassword });
const token = user.createJWT();
res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const login = async (req, res) => {
const { email, password } = req.body;
if (!email || !password) {
throw new BadRequestError("Please provide email and password");
}
const user = await User.findOne({ email: email });
if (!user) {
throw new UnauthenticatedError("Invalid Credentials - Not found");
}
const isPasswordCorrect = await user.comparePassword(password);
if (!isPasswordCorrect) {
throw new UnauthenticatedError("Invalid Credentials - wrong password");
}
const token = user.createJWT();
res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};
module.exports = { login, register };
