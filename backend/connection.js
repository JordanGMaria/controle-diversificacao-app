const config = require("./config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true); //para tirar a chamada de wraning do mongo
let database;
if(process.env.NODE_ENV === "test") database = config.databaseTest
else database = config.database
mongoose.connect(database, {
  keepAlive: true,
  useNewUrlParser: true,
});