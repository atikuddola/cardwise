require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/cards", require("./routes/cards"));
app.use("/admin", require("./routes/admin"));

app.listen(5000, () => console.log("Server running"));