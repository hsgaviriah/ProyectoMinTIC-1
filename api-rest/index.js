'use strict'

const mongoose = require("mongoose")
const app = require("./app")
const config = require('./config')




mongoose.connect(config.db)
    .then(db => console.log("Conexion a la base de datos establecidad..."))
    .catch(err => console.log(err));

/*, (err,res) =>{
if (err) throw err
console.log("Conexion a la base de datos establecidad...")
*/
app.listen(config.port, () => {
    console.log(`Todo está corriendo de manera éxitoso en el puerto ${config.port}`)
})




