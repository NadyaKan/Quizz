const mongoose = require("mongoose");
User = require("./models/userModel");
mongoose.connect("mongodb://127.0.0.1:27017/recipe_db", {
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

User.create({ name: "Jon", email: "jon@jonwexler.com", password: "12345" })
  .then((subscriber) => console.log(subscriber))
  .catch((error) => console.log(error.message));

User.findOne({ name: "Jon" }).then((result) => {
  subscriber = result;
  console.log(subscriber.getInfo());
});

// The next time you open REPL, you can load the contents of this file into the environment. Remember: Node.js runs asynchronously, so if you try to cre- ate a record in one command and query for that record immediately afterward, those two commands run virtually at the same time. To avoid any errors, run the commands individu- ally, or nest queries within each other’s then blocks.
