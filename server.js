const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();





const cron = require("node-cron");
const checkExpiringItems = require("./utils/expirationChecker");

// Run expiration check every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running expiration check...");
  checkExpiringItems();
});


const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/userRoutes");
const pantryRoutes = require("./routes/pantryRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

app.use("/api/users", userRoutes);
app.use("/api/pantry", pantryRoutes);
app.use("/api/recipes", recipeRoutes);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Smart Pantry API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
