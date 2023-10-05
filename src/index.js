import express from "express"
import pedidosrouter from "./routes/index.routes.js";
import conectarDB from "./config/db.js";
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())
conectarDB()

app.use(express.static("src/uploads"))
app.use(pedidosrouter)

app.listen(4000, () => {
    console.log("Servidro corriendo en el puerto 4000");
})