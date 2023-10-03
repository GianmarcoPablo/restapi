import { Router } from "express";
import { nuevoCliente, mostrarClientes, mostrarCliente, actualizarCliente, eliminarCliente } from "../controllers/clientesController.js";
import { nuevoProducto, subirArchivo, mostrarProductos, mostrarProducto, actualizarProducto, eliminarProducto } from "../controllers/productosController.js";

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

export default router
