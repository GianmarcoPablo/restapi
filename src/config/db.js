import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const db = await mongoose.connect("mongodb+srv://root:shinigami@cluster0.enolvrp.mongodb.net/clientes?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `Base de datos conectada: ${db.connection.host}:${db.connection.port}`
        console.log(url);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1)
    }
}

export default conectarDB