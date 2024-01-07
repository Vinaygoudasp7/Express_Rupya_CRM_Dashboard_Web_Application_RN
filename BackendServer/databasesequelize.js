import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("erdatabase", "root", "root@12345", {
    dialect: "mysql",
    host: "localhost",
});


//create  the tabel if they dont exist and synchronize the associations
sequelize.sync().then(() => {
    console.log('data base asynchronized succesfully.');
}).catch((error) => {
    console.error('error syncing the database', error)
})

export { sequelize, Sequelize }