const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userAuthRoutes = require("./routes/userAuth");
const studentAuth=require('./routes/StudentRoutes');
const schoolRoundRoutes = require("./routes/SchoolRound");
const teacherRoutes = require("./routes/teacherRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo Error:", err));

// Use Routes
const adminAuthRoutes = require("./routes/adminAuth");
app.use("/api/admin", adminAuthRoutes); 


app.use("/api", userAuthRoutes);

app.use("/api/student",studentAuth);
console.log(typeof schoolRoundRoutes);
app.use("/api/rounds", schoolRoundRoutes);

app.get("/api/ping", (req, res) => {
  res.status(200).send("Backend is alive");
});


app.use("/api/teacher", teacherRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
