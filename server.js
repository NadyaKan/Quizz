const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;


//const DB_URI = process.env.MONGODB_URI || "mongodb://mongo:27017/quiz-data"; //Main DB

const DB_URI =
  process.env.MONGODB_URI || "mongodb://mongo:27017/quiz-data" ||
  (process.env.NODE_ENV === "test"
    ? "mongodb://mongo:27017/quiz_test_db"
    : "mongodb://mongo:27017/quiz_db");



//"mongodb://127.0.0.1:27017/quiz_db"
mongoose.connect(DB_URI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,

}).then(() => {
  app.listen(port, () => console.info(`server listening on port ${port}`));
  console.log("Main DB connected");
});
