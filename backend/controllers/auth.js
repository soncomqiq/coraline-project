const database = require("../database");
const bjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    JWT_SECRET,
    JWT_LIFE_TIME_IN_SECOND
} = process.env;

const register = async (req, res) => {
    try {
        const { username, password, name, surname, birthday } = req.body;
        const targetUser = database.getPersonByStringField(username, "username");

        if (targetUser) {
            res.status(400).send({ message: "Username already taken!." });
        } else {
            const salt = bjs.genSaltSync(Number(process.env.SALT_ROUND));
            const hashPW = bjs.hashSync(password, salt);

            await database.save({
                username,
                name,
                surname,
                birthday,
                password: hashPW,
            });

            res.status(201).send({ message: "User created" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "something went wrong." });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const targetUser = database.getPersonByStringField(username, "username");

        if (!targetUser) {
            res.status(400).send({ message: "Username or password is wrong." });
        } else {
            const isCorrect = bjs.compareSync(password, targetUser.password);
            generateResponse(targetUser, isCorrect, res);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "something went wrong." });
    }
};

const logout = (req, res) => {
    if (req.cookies.jwt) {
        res
            .clearCookie('jwt')
            .status(200)
            .json({
                message: 'You have logged out'
            });
    } else {
        res.status(401).json({
            error: 'Invalid jwt'
        });
    }
};

const getUserProfile = async (req, res) => {
    const userProfile = database.getPersonById(req.user.id);

    if (userProfile) {
        delete userProfile.password;
    }

    res.status(200).send(userProfile);
};

const generateResponse = (user, isCorrect, res) => {
    if (isCorrect) {
        const payload = { id: user.id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: Number(JWT_LIFE_TIME_IN_SECOND) });
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 36000,
            secure: false,
        });

        res.json({ success: true, token: "JWT " + token });
    } else {
        const wrongResponse = { message: "Username or password is wrong." };

        res.status(400).send(wrongResponse);
    }
};

module.exports = {
    register,
    login,
    logout,
    getUserProfile,
};