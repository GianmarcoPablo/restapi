import Productos from "../models/Productos.js"
import multer from "multer"
import shortid from "shortid"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtén la ruta del directorio actual del módulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads/")
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1]
        cb(null, `${shortid.generate()}.${extension}`)
    }
})

const configuracionMulter = {
    storage: fileStorage,
    fileFilter(req, file, cb) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true)
        } else {
            cb(new Error("Formato no válido"))
        }
    }
}

const upload = multer(configuracionMulter).single("imagen")

const subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error.message })
        }
        return next()
    })
}

const nuevoProducto = async (req, res) => {
    try {
        const producto = new Productos(req.body)
        if (req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save()
        res.json({ msg: "Producto agregado correctamente" })
    } catch (error) {
        console.log(error);
    }
}

const mostrarProductos = async (req, res) => {
    try {
        const productos = await Productos.find()
        res.json(productos)
    } catch (error) {
        console.log(error);
    }
}
const mostrarProducto = async (req, res) => {
    const { productoId } = req.params
    try {
        const producto = await Productos.findById(productoId)
        if (!producto) {
            res.json({ mensaje: "El producto no se encontro" })
            return
        }
        res.json(producto)
    } catch (error) {
        console.log(error);
    }
}

const actualizarProducto = async (req, res) => {
    const { productoId } = req.params
    try {

        let productoAnterior = await Productos.findById(productoId)
        let nuevoProducto = req.body
        if (req.file) {
            nuevoProducto.imagen = req.file.filename
        } else {
            nuevoProducto.imagen = productoAnterior.imagen
        }
        let producto = await Productos.findOneAndUpdate({ _id: productoId }, nuevoProducto, {
            new: true
        })
        res.json(producto)
    } catch (error) {
        console.log(error);
    }
}

const eliminarProducto = async (req, res) => {
    const { productoId } = req.params
    try {
        await Productos.findOneAndDelete({ _id: productoId })
        res.json({ msg: "Producto Eliminado correctamente" })
    } catch (error) {

    }
}

export {
    nuevoProducto,
    subirArchivo,
    mostrarProductos,
    mostrarProducto,
    actualizarProducto,
    eliminarProducto
}
