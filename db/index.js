import Sequelize from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URI, {
    logging: false,
});
export default sequelize;
