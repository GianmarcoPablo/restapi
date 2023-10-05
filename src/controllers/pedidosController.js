import Pedidos from "../models/Pedidos.js"

const nuevoPedido = async (req, res) => {
    const pedido = new Pedidos(req.body)
    try {
        await pedido.save()
        res.json({ msg: "Se agrego un nuevo pedido" })
    } catch (error) {
        console.log(error);
    }
}

const mostrarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedidos.find().populate("cliente").populate({
            path: "pedido.producto",
            model: "Productos"
        })
        res.json(pedidos)
    } catch (error) {
        console.log(error);
    }
}

const mostrarPedido = async (req, res) => {
    const { pedidoID } = req.params
    const pedido = await Pedidos.findById(pedidoID).populate("cliente").populate({ path: "pedido.producto", model: "Productos" })
    if (!pedido) {
        res.json({ msg: "Pedido no encontrado" })
        return
    }
    res.json(pedido)
}

const actualizarPedido = async (req, res) => {
    const { pedidoID } = req.params
    try {
        let pedido = await Pedidos.findOneAndUpdate({ _id: pedidoID }, req.body, {
            new: true
        }).populate("cliente").populate({ path: "pedido.producto", model: "Productos" })
        res.json(pedido)
    } catch (error) {
        console.log(error);
    }
}

const eliminarPedido = async (req, res) => {
    const { pedidoID } = req.params
    try {
        await Pedidos.findOneAndDelete({ _id: pedidoID })
        res.json("El pedido se ha eliminado")
    } catch (error) {
        console.log(error);
    }
}

export {
    nuevoPedido,
    mostrarPedidos,
    mostrarPedido,
    actualizarPedido,
    eliminarPedido
}