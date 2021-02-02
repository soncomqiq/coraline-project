require("dotenv").config();
require("./_passport");
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const route = require("./routes");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'],
}));

app.use("/auth", route.auth);
app.use("/grade", route.grade);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
});
