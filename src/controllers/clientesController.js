import Clientes from "../models/Clientes.js";

const nuevoCliente = async (req, res) => {
    const { email } = req.body

    const cliente = await Clientes.findOne({ email })
    if (cliente) {
        const error = new Error("El correo ya esta en uso")
        return res.status(400).json({ msg: error.message })
    }

    try {
        const cliente = new Clientes(req.body)
        await cliente.save()
        res.json({ mensaje: "Se agrego correctamente" })
    } catch (error) {
        console.log(error);
    }
}

const mostrarClientes = async (req, res) => {
    try {
        const clientes = await Clientes.find()
        res.json(clientes)
    } catch (error) {
        console.log(error);
    }
}

const mostrarCliente = async (req, res) => {
    const { idCliente } = req.params
    try {
        const cliente = await Clientes.findById(idCliente)
        if (!cliente) {
            res.json({ msg: "Ese cliente no existe" })
            return
        }
        res.json(cliente)
    } catch (error) {

    }
}

const actualizarCliente = async (req, res) => {
    const { idCliente } = req.params
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id: idCliente }, req.body, { new: true })
        res.json(cliente)
    } catch (error) {
        console.log(error);
    }
}

const eliminarCliente = async (req, res) => {
    const { idCliente } = req.params
    try {
        await Clientes.findOneAndDelete({ _id: idCliente })
        res.json({ msg: "Eliminado correctamente" })
    } catch (error) {
        console.log(error);
    }
}

export {
    nuevoCliente,
    mostrarClientes,
    mostrarCliente,
    actualizarCliente,
    eliminarCliente
}