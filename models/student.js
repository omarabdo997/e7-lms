import Sequelize from "sequelize";
import db from "../db/index.js";

const Student = db.define("students", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    code: {
        type: Sequelize.STRING(7),
        allowNull: false,
    },
});

export default Student;
