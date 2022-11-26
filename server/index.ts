import express from 'express'
import cors from 'cors'
import router from './user/routes'


const app = express();
const PORT = process.env.PORT || 3001
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}));
app.use(express.json())
app.use("/", router)
app.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`))
