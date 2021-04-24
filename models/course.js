import Sequelize from "sequelize";
import db from "../db/index.js";

const Course = db.define("courses", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    code: {
        type: Sequelize.STRING(6),
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING(200),
        allowNull: true,
    },
});

export default Course;
