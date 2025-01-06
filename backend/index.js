const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { dbConnection } = require("./database/dbconnection");  
const userRouter = require("./routes/user.route");  
const eventRouter = require("./routes/event.route");  

dotenv.config({ path: "./config/config.env" });  

const app = express();  

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],  
    methods: ["POST", "GET", "PUT", "DELETE"],  
    credentials: true,  
  })
);

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  

// Set up routes
app.use("/api/users", userRouter);  
app.use("/api/events", eventRouter);  

dbConnection();  

const PORT = process.env.PORT || 8000; 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
