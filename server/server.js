const express = require("express");
const app = express();
const connectDB = require("./db");
connectDB();

app.use("/users", require("./routes/Users"));
app.use("/userlogin", require("./routes/UserLogin"));
app.use("/todos", require("./routes/Todos"));

app.listen("3000", () => {
  console.log("server is running on port 5000");
});
