import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { nanoid } from 'nanoid';



const vendedoresBackend = [
    {
        nombreVendedor: "Juan"
    },
    {
        nombreVendedor: "Alberto"
    },
    {
        nombreVendedor: "Maria"
    },
    {
        nombreVendedor: "Camila"
    },
    {
        nombreVendedor: "Carlos"
    }
]


const Ventas = () => {

    const [ventas, setVentas] = useState([]);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    const [vendedores, setVendedores] = useState([]);
    const [productosVenta, setProductosVenta] = useState([]);

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [textoBoton, setTextoBoton] = useState("Agregar nueva venta");

    const obtenerVentas = async () => {
        const options = { method: 'GET', url: 'http://localhost:3001/api/venta' };
        await axios
            .request(options)
            .then(function (response) {
                setVentas(response.data.ventas);
            })
            .catch(function (error) {
                console.error(error);
            });
        setEjecutarConsulta(false)
    };

    useEffect(() => {
        //obtener lista de ventas desde el back


        //Llamado vendedores del backend
        setVendedores(vendedoresBackend)
        if (ejecutarConsulta) {
            obtenerVentas();
        }

    }, [ejecutarConsulta]);




    useEffect(() => {
        if (mostrarTabla) {
            setEjecutarConsulta(true)
            setTextoBoton("Agregar nueva venta")
        } else {
            setTextoBoton("Mostrar ventas")
            setEjecutarConsulta(false)
        }
    }, [mostrarTabla]);

    return (
        <div className="contenedor_listarventas">
            <button className="boton bt_adicion_producto" onClick={() => setMostrarTabla(!mostrarTabla)}> {textoBoton}</button>
            {mostrarTabla ? (
                <TablaVentas
                    listaVentas={ventas}
                    setEjecutarConsulta={setEjecutarConsulta}
                    setMostrarTabla={setMostrarTabla}
                    listaVendedores={vendedores} />
            ) : (
                <FormularioAgregarVenta
                    setMostrarTabla={setMostrarTabla}
                    listaVentas={ventas}
                    listaProductosVenta={productosVenta}
                    listaVendedores={vendedores}
                    setProductosVenta={setProductosVenta}
                    setVentas={setVentas} />
            )}
            <ToastContainer
                position="bottom-center"
                autoClose={3500}
            />
        </div>
    );
};


const TablaVentas = ({ listaVentas, setEjecutarConsulta, setMostrarTabla, listaVendedores }) => {
    const [busqueda, setBusqueda] = useState('');
    const [ventasFiltradas, setVentasFiltradas] = useState(listaVentas);
  
    useEffect(() => {
      setVentasFiltradas(
        listaVentas.filter((elemento) => {
          return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        })
      );
    }, [busqueda, listaVentas]);

    useEffect(() => {
        console.log("este es el estado de ventas en el componente", listaVentas)

    }, [listaVentas])

    return (
        <div className="contenedor_listarventas">
            <h2 className="titulo_pagina_listarventas">Módulo Administración de Ventas</h2>

            <div className="cuadro_info">
                <div className="busqueda">
                    
                    <label className="label_listarventas"> Filtrar

                        <input value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="input_listarventas"
                            type="text" placeholder="Buscar" />
                    </label>
                    
                    
                </div>
                <hr />
                <section className="listado">
                    <table className="table_listarventas">
                        <thead className="clase1">
                            <th className="th_listar"  >#Orden</th>
                            <th className="th_listar" >Fecha</th>
                            <th className="th_listar"> Vendedor</th>
                            <th className="th_listar" >idCliente</th>
                            <th className="th_listar"> Nombre Cliente</th>
                            <th className="th_listar"> Estado </th>
                            <th className="th_listar"> Descripción</th>
                            <th className="th_listar"> Valor Total</th>
                            <th className="th_listar"> Editar/ Guardar</th>
                        </thead>
                        <tbody>
                            {
                            ventasFiltradas.map((ventas) => {
                                return (

                                    <FilaVenta

                                        key={nanoid()}
                                        ventas={ventas}
                                        setEjecutarConsulta={setEjecutarConsulta}
                                        setMostrarTabla={setMostrarTabla}
                                        listaVendedores={listaVendedores}
                                    />
                                )
                            })
                            }

                        </tbody>


                    </table>

                </section>
            </div>

        </div>


    );
};



const FormularioAgregarVenta = ({ setMostrarTabla, listaVentas, listaProductosVenta, setProductosVenta, setVentas, listaVendedores }) => {
    //datos de la tabla de venta
    const [idVenta, setIdVenta] = useState('');
      const [nombreVendedor, setNombreVendedor] = useState('');
      const [valorTotal, setValorTotal] = useState('');
  
    const [idCliente, setIdCliente] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [descripcionVenta, setDescripcionVenta] = useState('');

  
    const formProductos = useRef(null);


    const submitProductos = (e) => {
        e.preventDefault();
        const fpd = new FormData(formProductos.current);

        const nuevoProducto = {};
        fpd.forEach((value, key) => {
            nuevoProducto[key] = value;

        });




        toast.success("Producto añadido")
        setProductosVenta([...listaProductosVenta, nuevoProducto])

        //setDescripcion
        let listadotoString = JSON.stringify(listaProductosVenta);
        setDescripcionVenta(listadotoString)

    }

    const enviarVentasBackend = (e) => {

        console.log("id", idVenta, " vendedor", nombreVendedor, " nombre cliente", nombreCliente)
        if (idVenta === '' || idCliente === '' || /*descripcion === '' ||*/ nombreCliente === '' || nombreVendedor === '' || valorTotal === '') {
            toast.error('Ingrese todos los campos');
        } else {

            const VentaSchema = {
                idVenta: idVenta,
                nombreVendedor: nombreVendedor,
                descripcionVenta: descripcionVenta,
                valorTotal: valorTotal,
                idCliente: idCliente,
                nombreCliente: nombreCliente
            };

            axios.post(`http://localhost:3001/api/venta/agregar`, VentaSchema)
                .then(res => {
                    toast.success('Venta Registrada con Exito');
                    setMostrarTabla(true);
                    setVentas([...listaVentas, { idVenta: idVenta, nombreVendedor: nombreVendedor, idCliente: idCliente, nombreCliente: nombreCliente, valorTotal: valorTotal }])

                });







        };
    };


    return (
        <div className="contenedor_RegVentas">
            <h2 className="Titulo_RegVentas">Modulo Registro de Ventas</h2>
            <div className="Cuadro_ingreso">
                <div className="ingreso_info">
                    <div className="info_venta">
                        <label className="form">
                            <label className="label_regventa">ID VENTA</label>
                            <input className="input_info" type="number" placeholder="ID" name="idVenta" value={idVenta} onChange={(e) => { setIdVenta(e.target.value) }} required />
                        </label>
                        <label className="form">
                            <label className="label_regventa">VALOR TOTAL</label>
                            <input className="input_info" type="number" placeholder="$" name="valorTotal" value={valorTotal} onChange={(e) => { setValorTotal(e.target.value) }} required />
                        </label>
                    </div>
                    <hr />
                    <form ref={formProductos} onSubmit={submitProductos} className="seccion_tabla">
                        <table className="tabla_registro">
                            <caption className="Titulo_tabla">Registro de productos</caption>
                            <thead className="thead">
                                <th className="th_regventa">ID Producto</th>
                                <th className="th_regventa">Cantidad</th>
                                <th className="th_regventa">Precio unitario</th>
                            </thead>
                            <tbody>
                                <td name="id_producto" className="td_regventa">
                                    <label htmlFor="idProducto">
                                        <input name="idProducto" className="input_info" type="text" required />
                                    </label>
                                </td>
                                <td name="cantidad" className="td_regventa">
                                    <label htmlFor="cantidadProducto">

                                        <input name="cantidadProducto" className="input_info" type="text" required />
                                    </label>
                                </td>
                                <td name="precio_unitario" className="td_regventa">
                                    <label htmlFor="valorUnitarioProducto">
                                        <input name="valorUnitarioProducto" className="input_info" type="text" required />
                                    </label>
                                </td>
                            </tbody>
                        </table>
                        <div>
                            <button
                                className="boton bt_adicion_producto"
                                type="submit"
                            >
                                Adicionar producto
                            </button>
                        </div>
                    </form>
                    <div className="nuevosProductos">
                        <table className="tableProductos">
                            <thead className="clase1">
                                <th className="th_listar"  >IdProducto</th>
                                <th className="th_listar" >Cantidad</th>
                                <th className="th_listar" >Valor unitario</th>
                                <th className="th_listar" >Valor total</th>
                            </thead>
                            <tbody>
                                {listaProductosVenta.map((productosVenta) => {
                                    return (
                                        <tr key={nanoid()}>
                                            <td className="td_listar"> {productosVenta.idProducto}</td>
                                            <td className="td_listar">{productosVenta.cantidadProducto}</td>
                                            <td className="td_listar">{productosVenta.valorUnitarioProducto}</td>
                                            <td className="td_listar">{productosVenta.cantidadProducto * productosVenta.valorUnitarioProducto}</td>

                                        </tr>

                                    );
                                })}
                            </tbody>
                        </table>
                    </div>



                    <hr />
                    <div className="info_cliente">
                        <table className="tabla_cliente">
                            <caption className="Titulo_tabla">Datos del Cliente</caption>
                            <thead className="thead">
                                <th className="th_regventa">Id Cliente</th>
                                <th className="th_regventa">Nombre</th>

                            </thead>
                            <tbody>
                                <td className="td_regventa"><input name="idCliente" value={idCliente} onChange={(e) => { setIdCliente(e.target.value) }} className="input_info" type="text" required /> </td>

                                <td className="td_regventa"><input name="nombreCliente" value={nombreCliente} onChange={(e) => { setNombreCliente(e.target.value) }} className="input_info" type="text" required /> </td>

                            </tbody>
                        </table>

                    </div>
                    <hr />
                    <div className="info_vendedor">
                        <div> Vendedor
                            <select className="selector_vendedor" defaultValue="" name="vendedor" value={nombreVendedor} onChange={(e) => { setNombreVendedor(e.target.value) }} required>

                                <option disabled value="">seleccionar ..</option>
                                {listaVendedores.map((vendedores) => {
                                    return (
                                        <option key={nanoid()}>{vendedores.nombreVendedor}</option>
                                    );
                                })}
                            </select>


                        </div>
                    </div>
                </div>
                <div className="bt_centrado">
                    <button
                        type="submit"
                        onClick={() => { enviarVentasBackend() }}
                        className="boton bt_registro_venta"
                    >
                        Registrar venta
                    </button>
                </div>
            </div>

        </div >

    );
}


const FilaVenta = ({ ventas, setEjecutarConsulta, listaVendedores }) => {
    const [edit, setEdit] = useState(false);
    const [infoNuevaVenta, setInfoNuevaVenta] = useState({
        nombreVendedor: ventas.nombreVendedor,
        estadoVenta: ventas.estadoVenta,
        descripcionVenta: ventas.descripcionVenta,
        valorTotal: ventas.valorTotal,
        idCliente: ventas.idCliente,
        nombreCliente: ventas.nombreCliente
    });

    const actualizarVenta = async () => {
        console.log(infoNuevaVenta)

        //Enviar info al backend
        const options = {
            method: 'PUT',
            url: `http://localhost:3001/api/venta/${ventas._id}`,
            headers: { 'Content-Type': 'application/json' },
            // ESTO FUE LO QUE CAMBIE
            data: { ...infoNuevaVenta, ventaId: ventas._id },

        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                setEdit(false);
                setEjecutarConsulta(true);
                toast.success("Venta modificada con exito");

            }).catch(function (error) {
                console.error(error);
                toast.error("Error modificando la venta")
            });

    };

    const eliminarVenta = async () => {

        const options = {
            method: 'DELETE',
            url: `http://localhost:3001/api/venta/${ventas._id}`,
            headers: { 'Content-Type': 'application/json' },
            data: { ventaId: ventas._id },
        };

        await axios.request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success("Venta eliminada");
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
                    <td className="td_listar"> {ventas.idVenta} </td>
                    <td className="td_listar">{ventas.fecha}</td>
                    <td className="td_listar">
                        <select className="select_producto"
                            value={infoNuevaVenta.nombreVendedor}
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, nombreVendedor: e.target.value })}
                            name="nombreVendedor"
                            id="nombreVendedor" required>
                            <option disabled value=""> Seleccione...</option>
                            {listaVendedores.map((vendedores) => {
                                return (
                                    <option key={nanoid()}>{vendedores.nombreVendedor}</option>
                                );
                            })}


                        </select>
                    </td>
                    <td className="td_listar">
                        <input type="text"
                            className="input_info"
                            value={infoNuevaVenta.idCliente}
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, idCliente: e.target.value })}
                        />
                    </td>

                    <td className="td_listar">
                        <input type="text"
                            className="input_info"
                            value={infoNuevaVenta.nombreCliente}
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, nombreCliente: e.target.value })}
                        />
                    </td>
                    <td className="td_listar">
                        <select className="select_producto"
                            value={infoNuevaVenta.estadoVenta}
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, estadoVenta: e.target.value })}
                            name="estadoVenta"
                            id="estadoventa" required>
                            <option disabled value=""> Seleccione...</option>
                            <option> En proceso</option>
                            <option> Cancelada</option>
                            <option>Entregada</option>


                        </select>
                    </td>

                    <td className="td_listar">
                        <input
                            type="text"
                            className="input_info"
                            value={infoNuevaVenta.descripcionVenta}
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, descripcionVenta: e.target.value })}
                        />
                    </td>
                    <td className="td_listar">
                        <input
                            type="text"
                            className="input_info"
                            value={infoNuevaVenta.valorTotal}
                            onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, valorTotal: e.target.value })}
                        />
                    </td>



                </>
            ) : (
                <>
                    <td className="td_listar"> {ventas.idVenta}</td>
                    <td className="td_listar">{ventas.fecha}</td>
                    <td className="td_listar">{ventas.nombreVendedor}</td>
                    <td className="td_listar"> {ventas.idCliente}</td>
                    <td className="td_listar">{ventas.nombreCliente}</td>
                    <td className="td_listar"> {ventas.estadoVenta}</td>
                    <td className="td_listar">{ventas.descripcionVenta}</td>
                    <td className="td_listar">{ventas.valorTotal}</td>
                </>

            )}
            <td className="td_listar">
                <div className="flex w-full justify-around">
                    {edit ? (
                        <i
                            onClick={() => actualizarVenta()}
                            className="fas fa-check text-green-700 hover:text-green-500"
                        />


                    ) : (
                        <i
                            onClick={() => setEdit(!edit)}
                            className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                        />
                    )}

                    <i
                        onClick={() => eliminarVenta()}
                        className="fas fa-trash text-red-700 hover:text-yellow-500" />
                </div>
            </td>
        </tr>
    );
}

export default Ventas



