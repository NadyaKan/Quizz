const app = require('./app');
const mongoose = require("mongoose");

const DB_URI = process.env.MONGODB_URI || "mongodb://mongo:27017/quiz-data"; //Main DB
mongoose.connect(DB_URI, { useNewUrlParser: true }).then(() => {
  app.listen(port, () => console.info(`server listening on port ${port}`));
  console.log("Main DB connected");
});