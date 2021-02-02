const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const dbPath = path.resolve(__dirname, "./database.txt");

const save = (user) => {
    return new Promise((resolve, reject) => {
        try {
            const id = uuidv4();
            const dbText = fs.readFileSync(dbPath, { encoding: "utf-8" });
            const allUser = JSON.parse(dbText);
            const userWithId = { id, ...user };
            allUser.push(userWithId);
            const newAllUser = JSON.stringify(allUser);
            fs.writeFileSync(dbPath, newAllUser, { encoding: "utf-8" });
            resolve(userWithId);
        } catch (err) {
            reject(err);
        }
    });
};

const getPersonById = (userId) => {
    const dbText = fs.readFileSync(dbPath, { encoding: "utf-8" });
    const allUser = JSON.parse(dbText);
    return allUser.find(e => e.id === userId);
};

const getPersonByStringField = (keyword, field) => {
    const dbText = fs.readFileSync(dbPath, { encoding: "utf-8" });
    const allUser = JSON.parse(dbText);
    return allUser.find(e => e[field] === String(keyword));
};

module.exports = {
    getPersonById,
    getPersonByStringField,
    save
};