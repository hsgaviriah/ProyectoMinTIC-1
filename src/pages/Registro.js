import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react/cjs/react.development'
import '../style/Registro.css'
import axios from 'axios';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registro = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre,setNombre]=useState("");
    const [correo, setCorreo] =useState('');
    const [password,setPassword] =useState('');
    const [usuario,setUsuario] =useState('');


    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/api/product',
            headers: {'Content-Type': 'application/json'}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
            setUsuarios(response.data.products)
          }).catch(function (error) {
            console.error(error);
          });
    }, [])

const listaUsuarios={usuarios}


    const crearRegistro = () => {
    


        const options = {
            method: 'POST',
            url: 'http://localhost:3001/api/product/agregar',
            headers: {'Content-Type': 'application/json'},
            data: {nombre: nombre, usuario: usuario, password: password, correo:correo}
          };
          
          axios.request(options).then(function (response) {
            console.log("Esta es la data", response.data);
            
            toast.success('Usuario Registrado con Exito');
            setUsuarios([...listaUsuarios, {nombre: nombre, usuario: usuario, password: password}])
          }).catch(function (error) {
            console.error("hubo un error", error);
      
          });
    }

    return (
        <div className="Container_registro">
            <h1 className="titulo_registro">A un paso de gestionar tus ventas... </h1>
            <div className="contenedor_registro">
                <h1 className="Titulo_registrate">Registrate</h1>
                <hr />
                <form className="ingreso_info">

                    <label className="form_producto" htmlFor="nombre">Nombre
                        <input className="input_registro_user input_producto" type="text" name="nombre" id="nombre" value={nombre} onChange={(e)=>{setNombre(e.target.value)}} required />
                    </label>


                    <label className="form_producto" htmlFor="usuario">Usuario
                        <input className="input_registro_user input_producto" type="text" name="usuario" id="usuario"  value={usuario} onChange={(e)=>{setUsuario(e.target.value)}} required />
                    </label>


                    <label className="form_producto" htmlFor="correo">Correo electrónico
                        <input className="input_registro_user input_producto" type="email" name="correo" id="correo"  value={correo} onChange={(e)=>{setCorreo(e.target.value)}}required />
                    </label>

                    <label className="form_producto" htmlFor="password">Contraseña
                        <input className="input_registro_user input_producto" type="password" name="password" id="password"  value={password} onChange={(e)=>{setPassword(e.target.value)}}required />
                    </label>


                 
                    <div className="centrar_boton">
                    <button onClick={()=> crearRegistro()} type="submit" className="botonRegistro bt_centrado">¡Registrarse ahora!</button>

                        <button type="reset" className="botonRegistro">Limpiar datos</button>

                        <Link to="/InicioSesion">
                            <button type="button" className="botonRegistro">¡Ya tengo una cuenta!</button>
                        </Link>



                    </div>
                </form>


            </div >
            <ToastContainer
                 position="bottom-center"
                 autoClose={3500}
             />

        </div >
    )
}

export default Registro