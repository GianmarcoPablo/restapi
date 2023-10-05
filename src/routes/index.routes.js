import { Router } from "express";
import { nuevoCliente, mostrarClientes, mostrarCliente, actualizarCliente, eliminarCliente } from "../controllers/clientesController.js";
import { nuevoProducto, subirArchivo, mostrarProductos, mostrarProducto, actualizarProducto, eliminarProducto, buscarProducto } from "../controllers/productosController.js";
import { nuevoPedido, mostrarPedidos, mostrarPedido, actualizarPedido, eliminarPedido } from "../controllers/pedidosController.js";

const router = Router()

//clientes
router.post("/clientes", nuevoCliente)
router.get("/clientes", mostrarClientes)
router.get("/clientes/:idCliente", mostrarCliente)
router.put("/clientes/:idCliente", actualizarCliente)
router.delete("/clientes/:idCliente", eliminarCliente)
//productos
router.post("/productos", subirArchivo, nuevoProducto)
router.get("/productos", mostrarProductos)
router.get("/productos/:productoId", mostrarProducto)
router.put("/productos/:productoId", subirArchivo, actualizarProducto)
router.delete("/productos/:productoId", eliminarProducto)
router.post("/productos/busqueda/:query", buscarProducto)
//pedidos
router.post("/pedidos/nuevo/:idUsuario", nuevoPedido)
router.get("/pedidos", mostrarPedidos)
router.get("/pedidos/:pedidoID", mostrarPedido)
router.put("/pedidos/:pedidoID", actualizarPedido)
router.delete("/pedidos/:pedidoID", eliminarPedido)

export default router
