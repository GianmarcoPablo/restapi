import express from "express"
import pedidosrouter from "./routes/index.routes.js";
import conectarDB from "./config/db.js";


const app = express()
app.use(express.json())
conectarDB()

app.use(pedidosrouter)

app.listen(4000, () => {
    console.log("Servidro corriendo en el puerto 4000");
})