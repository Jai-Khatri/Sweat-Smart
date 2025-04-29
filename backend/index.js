import express from "express";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.route.js"
import userRoutes from "./routes/user.route.js"
import packageRoutes from "./routes/package.route.js"
import ConnectToDB from "./libs/db.js"
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/admin", adminRoutes)
app.use("/api/user" , userRoutes)
app.use("/api/package" , packageRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/sweat_smart/dist")))

    app.get("*" , (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/sweat_smart" , "dist" , "index.html"))
    }
)
}

app.listen(PORT , () => {
    console.log("Server is listening on PORT:- " , PORT)
    ConnectToDB();
})