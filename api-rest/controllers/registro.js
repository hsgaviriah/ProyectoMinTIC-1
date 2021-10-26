'use strict'

const Registro = require('../models/registro.js')

function getRegistro(req, res){
    
    let productId = req.params.productId
    Registro.findById(productId, (err, registro) =>{
        if(err) return res.status(500).send({message:"Error al realizar la peticion."})
        if (!registro) return res.status(404).send({message:"El usuario no existe."})

        res.status(200).send({registro})
    })
    console.log('GET /productos/:productoId')

}
function getRegistros(req, res){
    Registro.find({}, (err, registro) =>{
        if (err) return res.status(500).send({message:"Error al realizar la peticion."})
        if (!registro) return res.status(404).send({message:"No existen usuarios"})
        res.send(200, {products : registro})
    })
    console.log('GET /productos')

}
function saveRegistro(req, res){
    console.log(req.body)
    let registro = Registro()
    registro.idusuario = req.body.idusuario
    registro.nombre = req.body.nombre
    registro.usuario = req.body.usuario
    registro.password = req.body.password
    registro.correo = req.body.correo
    registro.estado = req.body.estado
    registro.rol = req.body.rol


    registro.save((err, registroStored) =>{
        if (err) res.status(500).send({message:"Error al salvar en la base de datos."})

        res.status(200).send({registro: registroStored})
    })
}
function updateRegistro(req, res){
    let productId = req.params.productId
    let update = req.body
    Registro.findByIdAndUpdate(productId,update, (err, productUpdated) =>{
        if (err) res.status(500).send({message:"Error al actualizar el usuario."})

        res.status(200).send({registro:productUpdated})
    } )

}
function deleteRegistro(req, res){
    let productId = req.params.productId

    Registro.findById(productId, (err, registro) =>{
        if (err) res.status(500).send({message:"Error al eliminar el usuario."})

        registro.remove(err =>{
            if (err) res.status(500).send({message:"Error al eliminar el usuario."})
            res.status(200).send({message:"El usuario fue eliminado."})
        })
        
    })

}

module.exports = {
    getRegistro,
    getRegistros,
    saveRegistro,
    updateRegistro,
    deleteRegistro

}