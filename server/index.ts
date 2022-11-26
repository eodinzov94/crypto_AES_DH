import express from 'express'
import {body} from "express-validator";
import Controller from "./user/controller";
import cors from 'cors'

const app = express();
const PORT =  3001
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(express.json())
app.post("/create-session",Controller.createSession);
app.delete("/delete-session", Controller.deleteSession);
app.post("/send-message", Controller.sendMessage);
app.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`))
