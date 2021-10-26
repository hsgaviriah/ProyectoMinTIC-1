import React, { useEffect, useState, useRef, Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { nanoid } from 'nanoid';




const Productos = () => {

    const [productos, setProductos] = useState([]);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    //const [mostrarProductosAdicionales, setMostrarProductosAdicionales] = useState(false);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [textoBoton, setTextoBoton] = useState("Agregar nueva venta");

    const obtenerProductos = async () => {
        const options = { method: 'GET', url: 'http://localhost:3001/api/productos' };
        await axios
          .request(options)
          .then(function (response) {
            setProductos(response.data.products);
          })
          .catch(function (error) {
            console.error(error);
          });
        setEjecutarConsulta(false);
      };




    useEffect(() => {
        console.log('consulta', ejecutarConsulta);

        if (ejecutarConsulta) {
            obtenerProductos();
        }
    }, [ejecutarConsulta])




    useEffect(() => {
        if (mostrarTabla) {
            setEjecutarConsulta(true);
            setTextoBoton("Agregar nuevo productos")
        } else {
            setTextoBoton("Mostrar productos")
            setEjecutarConsulta(false)
        }
    }, [mostrarTabla]);

    return (
        <div className="contenedor_gestionP">
            <button className="boton bt_adicion_producto" onClick={() => setMostrarTabla(!mostrarTabla)}> {textoBoton}</button>
            {mostrarTabla ? (
                <TablaProductos
                    listaProductos={productos}
                    listaProductosFiltrado={productosFiltrados}
                    setEjecutarConsulta={setEjecutarConsulta} />
            ) : (
                <FormularioAgregarProducto
                    setMostrarTabla={setMostrarTabla}
                    listaProductos={productos}
                    setProductos={setProductos}
                />
            )}
            <ToastContainer
                position="bottom-center"
                autoClose={3500}
            />
        </div>
    );
};


const TablaProductos = ({ listaProductos, setEjecutarConsulta }) => {

    const [busqueda, setBusqueda] = useState('');
    const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

    useEffect(() => {
        setProductosFiltrados(
        listaProductos.filter((elemento) => {
            return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        })
        );
    }, [busqueda, listaProductos]);

        useEffect(() => {
            console.log("este es el estado de productos en el componente", listaProductos)

        }, [listaProductos])

    return (
        <div className="contenedor_gestionP">
            <h2 className="TituloPaginaP">Módulo Gestión de Productos</h2>
            <div class="informacion">
                <div className="Seccion1">
                    <h3 className="subtitulo_busqueda">Busqueda de productos</h3>
                    <div className="busquedaProducto">
                        <label className="subtitulo_busqueda"> Filtrar

                            

                            <input 
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="input_BuscarproductoD" type="text" name="Busquedaproductos" id="" placeholder="Buscar" 
                            />

                        </label>

                    </div>             

                </div>

                <hr />
                <div className="Seccion2">

                    <h3 className="subtitulo_busqueda">Lista de productos</h3>

                    <div class="Contenedor_Modificar_producto">
                        <table className="table_listarProductos">
                            <thead className="clase1">
                                <th className="th_listarP">ID</th>
                                <th className="th_listarP">Descripción</th>
                                <th className="th_listarP">Estado</th>
                                <th className="th_listarP">Cantidad Stock</th>
                                <th className="th_listarP">Vr. Unitario</th>
                                <th className="th_listarP"> Editar/ Eliminar</th>
                            </thead>
                            <tbody>
                                {productosFiltrados.map((productos) => {
                                    return (
                                        <FilaProducto
                                            key={nanoid()}
                                            productos={productos}
                                            setEjecutarConsulta={setEjecutarConsulta}
                                        />
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>



    );
};

const FilaProducto = ({ productos, setEjecutarConsulta }) => {
    const [edit, setEdit] = useState(false);
    const [infoNuevoProducto, setInfoNuevoProducto] = useState({
        descripcionProducto: productos.descripcionProducto,
        estadoProducto: productos.estadoProducto,
        cantidadProducto: productos.cantidadProducto,
        valorUnitarioProducto: productos.valorUnitarioProducto,
    });

    const actualizarProducto = async () => {
        console.log(infoNuevoProducto)

        //Enviar info al backend
        const options = {
            method: 'PUT',
            url: `http://localhost:3001/api/productos/${productos._id}`,
            headers: { 'Content-Type': 'application/json' },
            // ESTO FUE LO QUE CAMBIE
            data: { ...infoNuevoProducto, productoId: productos._id },

        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                setEdit(false);
                setEjecutarConsulta(true);
                toast.success("Producto modificado con exito");

            }).catch(function (error) {
                console.error(error);
                toast.error("Error modificando el producto")
            });

    };

    const eliminarProducto = async () => {

        const options = {
            method: 'DELETE',
            url: `http://localhost:3001/api/productos/${productos._id}`,
            headers: { 'Content-Type': 'application/json' },
            data: { productoId: productos._id },
        };

        await axios.request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success("Producto eliminado");
                setEjecutarConsulta(true);
            }).catch(function (error) {
                console.error(error);
                toast.error("No se pudo eliminar")
            });
    }




    return (
        <tr>
            {edit ? (
                <>
                    <td> {productos.idProducto} </td>
                    <td>
                        <input type="text"
                            value={infoNuevoProducto.descripcionProducto}
                            onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, descripcionProducto: e.target.value })}
                        />
                    </td>
                    <td>
                        <select className="select_producto"
                            value={infoNuevoProducto.estadoProducto}
                            onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, estadoProducto: e.target.value })}
                            name="estadoProducto"
                            id="estadoProducto" required>
                            <option disabled value=""> Seleccione...</option>
                            <option> Disponible</option>
                            <option> No Disponible</option>


                        </select>
                    </td>
                    <td>
                        <input type="text"
                            value={infoNuevoProducto.cantidadProducto}
                            onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, cantidadProducto: e.target.value })}
                        />
                    </td>
                    <td>
                        <input type="text"
                            value={infoNuevoProducto.valorUnitarioProducto}
                            onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, valorUnitarioProducto: e.target.value })}
                        />
                    </td>
                </>
            ) : (
                <>

                    <td className="td_listarP">{productos.idProducto}</td>
                    <td className="td_listarP">{productos.descripcionProducto}</td>
                    <td className="td_listarP">{productos.estadoProducto}</td>
                    <td className="td_listarP">{productos.cantidadProducto}</td>
                    <td className="td_listarP">{productos.valorUnitarioProducto}</td>
                </>
            )}
            <td className="td_listarP">
                <div className="flex w-full justify-around">
                    {edit ? (
                        <i
                            onClick={() => actualizarProducto()}
                            className="fas fa-check text-green-700 hover:text-green-500"
                        />


                    ) : (
                        <i
                            onClick={() => setEdit(!edit)}
                            className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                        />
                    )}

                    <i
                        onClick={() => eliminarProducto()}
                        className="fas fa-trash text-red-700 hover:text-yellow-500" />
                </div>
            </td>
        </tr>
    );
}

const FormularioAgregarProducto = ({ setMostrarTabla, listaProductos, setProductos }) => {
    //datos de la tabla de productos
    const form = useRef(null);

    const submitForm = async(e) => {
        e.preventDefault();

        //nivelacion-api
        const ProductoSchema = {
            idProducto: e.target.idProducto.value,
            valorUnitarioProducto: e.target.valorUnitarioProducto.value,
            cantidadProducto: e.target.cantidadProducto.value,
            descripcionProducto: e.target.descripcionProducto.value,
            estadoProducto: e.target.estadoProducto.value,

        };

        await axios.post(`http://localhost:3001/api/productos/agregar`, ProductoSchema)
            .then(res => {
                const fd = new FormData(form.current);

                const nuevoProducto = {};
                fd.forEach((value, key) => {
                    nuevoProducto[key] = value;
                });
                setMostrarTabla(true);
                toast.success("Producto agregado con exito");
                setProductos([...listaProductos, nuevoProducto])

            });


    };


    return (
        <div className="Contenedor_RegProductos">
            <h2 className="TituloPagina"> Módulo Registro de Producto</h2>
            <div className="Cuadro_ingresoProducto">

                <form ref={form} onSubmit={submitForm} className="ingreso_info">
                    <label className="form_producto" htmlFor="idProducto">ID producto
                        <input className="input_producto" type="number" placeholder="ID" name="idProducto" id="idProducto" required />
                    </label >

                    <label className="form_producto" htmlFor="descripcion">Descripción
                        <input className="input_producto" type="text" name="descripcionProducto" id="descripcionProducto" required />
                    </label >

                    <label className="form_producto" htmlFor="valorUnitarioProducto">
                        Vlr unitario
                        <input className="input_producto" type="number" placeholder="$" name="valorUnitarioProducto" id="valorUnitarioProducto" required />
                    </label >

                    <label className="form_producto" htmlFor="cantidadProducto">
                        Cantidad
                        <input className="input_producto" type="number" placeholder="" name="cantidadProducto" id="cantidadProducto" required />

                    </label >

                    <label className="form_producto" htmlFor="estadoProducto"> Estado de producto
                        <select className="select_producto" defaultValue="" name="estadoProducto" id="estadoProducto" required>
                            <option disabled value=""> Seleccione...</option>
                            <option> Disponible</option>
                            <option> No Disponible</option>

                        </select>
                    </label>

                    <button
                        type='submit'
                        className="boton bt_registro_producto bt_centrado"
                    //onClick={() => { enviarProductosBackend() }}
                    >
                        Registrar producto
                    </button>

                </form>


            </div>


        </div>

    );
}


export default Productos