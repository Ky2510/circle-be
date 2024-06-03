import express from "express";
import * as dotenv from "dotenv";
import db from "./src/db"
import router from "./src/routes"
import path from "path";
import cors from "cors";

dotenv.config()
const PORT = process.env.PORT || 3000;

const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(router)
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
app.get("/", async(req, res) => {

    const listTest = await db.test.findMany() 

    res.send(listTest)

})

app.listen(PORT, async() => {
    await db.$connect()
    console.log(`Success conected to PORT ${PORT}`)
})