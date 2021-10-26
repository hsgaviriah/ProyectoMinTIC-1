'use strict'
const { text } = require('body-parser')
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RegistroSchema = Schema({
    idusuario: String,
    nombre: String,
    usuario: String,
    correo: String,
    estado: {type: String, default:"Pendiente", enum:['Pendiente', 'Autorizado', 'No autorizado']},
    rol: {type: String,  default:"Vendedor", enum:['Administrador', 'Vendedor']},
    password: String,    
})

module.exports = mongoose.model('Registro', RegistroSchema)