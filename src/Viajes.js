import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import Modal from './components/ModalViaje';

const Viajes = () => {
//api entity
 
/*  const urlviajes = "https://localhost:44351/api/Entregas/";
  const urlchoferes = "https://localhost:44351/api/Empleadoes/";
  const urlclientes = "https://localhost:44351/api/Clientes/";
  const urlmetododepago= "https://localhost:44351/api/MetodoDePagoes/";*/

//api a mano

  const urlviajes = "https://localhost:44311/api/Entregas/";
  const urlchoferes = "https://localhost:44311/api/Empleados/";
  const urlclientes = "https://localhost:44311/api/Clientes/";
  const urlmetododepago= "https://localhost:44311/api/MetodosPago/";



  const [viajes, setViajes] = useState([]);
  const [choferes, setChoferes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [metodo, setMetodo] = useState([]);
  const [encontrado, setEncontrado] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [id,setId] = useState(0);

  const getViajes = (async () => {
    const response = await fetch(urlviajes);
    const json = await response.json();
    setViajes(json);
  })
  const getChoferes = (async () => {
    const response = await fetch(urlchoferes);
    const json = await response.json();
   
    setChoferes(json);
  })
  const getClientes = (async () => {
    const response = await fetch(urlclientes);
    const json = await response.json();
   
    setClientes(json);
  })
  const getMetodo = (async () => {
    const response = await fetch(urlmetododepago);
    const json = await response.json();
    setMetodo(json);
  })


  const openCloseModalInsert = (id) => {
    if (id){
      setId(id);
    } 
    else{
      setId(0);
    }
    setModalInsert(!modalInsert);  
  }

  useEffect(() => {
    getViajes();
    getClientes();
    getChoferes();
    getMetodo();

  }, [] )



  const GetPorId = async (id) => {
    const response = await fetch(urlviajes+id);
    const json = await response.json();
    setEncontrado(json);
    openCloseModalInsert(id);
    }

    const Delete = async (id) =>{
      const options = { 
        method: 'DELETE',
      };
      await fetch(urlviajes+id, options);
      setId(0);
      getViajes();
    } 
    const mostrarCliente = (c_id) => {
      const Cliente = clientes.filter(function(element){
        return element.c_id === c_id;
      });
      if(typeof Cliente === 'undefined'){
        return '';
        }else{
          if(typeof Cliente[0] === 'undefined')
          return '';
          else{
            console.log(Cliente[0].datosPersonales);
            return Cliente[0].datosPersonales;
          }
      
        }
    }

    const mostrarChofer = (e_id) => {
      const Chofer = choferes.filter(function(element){
        return element.e_id === e_id;
      });
      if(typeof Chofer === 'undefined'){
        return '';
        }else{
          if(typeof Chofer[0] === 'undefined')
          return '';
          else{
            console.log(Chofer[0].datosPersonales);
            return Chofer[0].datosPersonales;
          }
      
        }
    }
    const mostrarMetodo = (m_id) => {
      const Metodo = metodo.filter(function(element){
        return element.m_id === m_id;
      });
      if(typeof Metodo === 'undefined'){
        return '';
        }else{
          if(typeof Metodo[0] === 'undefined')
          return '';
          else{
            console.log(Metodo[0]);
            return Metodo[0];
          }
      
        }
    }


  return (
    <div className="App">
      <div className="container">
      <br></br>
      <h1>VIAJES CONCRETADOS</h1>
        <div className="row">
          
          <div className="col">
            <button className="btn btn-success" onClick={()=>openCloseModalInsert(0)}>Agregar</button>
          </div>
        </div>
        <br></br>
        <div className="row">
            <table className="table table-bordered">
            <thead>
                <tr>
                <th scopename="col" colSpan="3">Cliente</th>
                <th scopename="col" colSpan="3">Chofer</th>
                
                  <th className="align-middle" scope="col" rowSpan="2">Metodo de Pago</th>
                  <th className="align-middle" scope="col" rowSpan="2">Fecha</th>                 
                  <th className="align-middle" scope="col" rowSpan="2">Opciones</th>
                </tr>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Direccion</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Telefono</th>
                </tr>
              </thead>
              <tbody>
                {viajes.map(obj=> (
                  <tr>
                    <td key={"Cliente Nombre"}>{mostrarCliente(obj.ent_id_cliente).d_nombre}</td>
                    <td key={"Cliente Apellido"}>{mostrarCliente(obj.ent_id_cliente).d_apellido}</td>
                    <td key={"Cliente Direccion"}>{mostrarCliente(obj.ent_id_cliente).d_direccion}</td>
                    <td key={"Chofer Nombre"}>{mostrarChofer(obj.ent_id_empleado).d_nombre}</td>
                    <td key={"Chofer Apellido"}>{mostrarChofer(obj.ent_id_empleado).d_apellido}</td>  
                    <td key={"Chofer Dni"}>{mostrarChofer(obj.ent_id_empleado).d_telefono}</td> 
                    <td key={"Metodo"}>{mostrarMetodo(obj.ent_id_metododepago).m_nombre}</td> 
                    <td key={"Fecha"}>{obj.ent_fecha}</td> 
                    <td>
                      <button className="btn btn-primary" onClick={() => GetPorId(obj.ent_id)}>Editar</button>
                      <p></p>
                      <button className="btn btn-danger" onClick={() => Delete(obj.ent_id)}>Eliminar</button>
                    </td> 
                  </tr>
                ))}
              </tbody>
        </table>
        {Modal(modalInsert,encontrado,id,urlviajes,openCloseModalInsert,getViajes,clientes,choferes,metodo)}
        </div>
      </div>
    </div>
  );
}

export default Viajes;