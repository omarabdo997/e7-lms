import express from "express";
import bodyParser from "body-parser";
import * as errorsController from "./controllers/errors.js";
import db from "./db/index.js";
import Student from "./models/student.js";
import Course from "./models/course.js";
import courseRouter from "./routes/course.js";
import studentRouter from "./routes/student.js";
import cors from "cors";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "./public")));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(courseRouter);
app.use(studentRouter);
app.use(errorsController.get404);
app.use((error, req, res, next) => {
    if (error.statusCode) {
        return res.status(error.statusCode).json({
            success: false,
            statusCode: error.statusCode,
            message: error.message,
            validators: error.validators,
        });
    }
    return res.status(500).json({
        success: false,
        message: "Something went wrong please try again!",
    });
});

db.sync()
    .then((res) => {
        app.listen(process.env.PORT, () => {
            console.log(
                `Server is running on port ${process.env.PORT}`
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });
