// This file for DB Connection
const mongoose = require("mongoose");
async function getDataBase() {
  mongoose
    .connect(
      "mongodb+srv://karthi:test%40123@cluster0.xr0qyie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("DataBase Is Connected");
    })
    .catch((e) => {
      console.log("DataBase Connection Error", e);
    });
}

module.exports = {
  getDataBase,
};
