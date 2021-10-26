'use strict'

const express = require("express")
const registroCtrl = require("../controllers/registro")
const ventaCtrl =require('../controllers/ventas')
const productoCtrl= require("../controllers/productos")
const api = express.Router()
const app =express();

const cors=require('cors');
app.use(cors(/*{ origin: true, credentials: true }*/)); // habilita auth


api.get('/product', registroCtrl.getRegistros)
api.get('/product/:productId', registroCtrl.getRegistro)
api.post('/product/agregar', registroCtrl.saveRegistro)
api.put('/product/:productId', registroCtrl.updateRegistro)
api.delete('/product/:productId', registroCtrl.deleteRegistro)

api.get('/venta', ventaCtrl.getVentas)
api.get('/venta/:ventaId', ventaCtrl.getVenta)
api.post('/venta/agregar', ventaCtrl.saveVenta)
api.put('/venta/:ventaId',ventaCtrl.updateVenta)
api.delete('/venta/:ventaId',ventaCtrl.deleteVenta)

api.get('/productos', productoCtrl.getProductos)
api.get('/productos/:productoId', productoCtrl.getProducto)
api.post('/productos/agregar', productoCtrl.saveProductos)
api.put('/productos/:productoId', productoCtrl.updateProductos)
api.delete('/productos/:productoId', productoCtrl.deleteProductos)

module.exports = api
