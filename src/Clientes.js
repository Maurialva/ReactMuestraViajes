import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import Modalfotos from './components/ModalFoto';
import Modal from './components/ModalCliente';


const Clientes = () => {
  //api entity 
  /* const urlclientes = "https://localhost:44351/api/Clientes/";*/
  //api a mano
  
    const urlclientes = "https://localhost:44311/api/Clientes/";
  
    const [clientes, setClientes] = useState([]);
    const [encontrado, setEncontrado] = useState([]);
    const [modalInsert, setModalInsert] = useState(false);
    const [id,setId] = useState(0);
    const [modalFoto, setModalFoto] = useState(false);
    const [camino, setCamino] = useState();

    const getClientes = (async () => {
      const response = await fetch(urlclientes);
      const json = await response.json();
     
      setClientes(json);
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
  const openCloseFoto = (caminofoto) => {
      setCamino(caminofoto)
       setModalFoto(!modalFoto)
    }
  
    useEffect(() => {
      getClientes();
    }, [] ) 

    const GetPorId = async (id) => {
      const response = await fetch(urlclientes+id);
      const json = await response.json();
      setEncontrado(json);
      openCloseModalInsert(id);
      }
  
  
    return (
      <div className="App">
        <div className="container">
        <br></br>
        <h1>CLIENTES</h1>
          <div className="row">
            
            <div className="col">
              <button className="btn btn-success" onClick={()=>openCloseModalInsert(0)}>Nuevo Cliente</button>
            </div>
          </div>
          <br></br>
          <div className="row">
              <table className="table table-bordered">
              <thead>
                  <tr>
                    <th class="btn1" className="align-middle" scope="col" rowSpan="2">Foto</th>
                    <th scopename="col" colSpan="4">Nombre Completo</th>
                    <th className="align-middle" colSpan="2"scope="col" rowSpan="2">Telefono</th>
                    <th className="align-middle" colSpan="2"scope="col" rowSpan="2">Email</th>                 
                    <th className="align-middle" colSpan="2"scope="col" rowSpan="2">Direccion</th>
                    <th className="align-middle" colSpan="2"scope="col" rowSpan="2">Opciones</th>
                  </tr>
                  <tr>
                    <th colSpan="2"scope="col">Nombre</th>
                    <th colSpan="2"scope="col">Apellido</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map(obj=> (
                    <tr>
                      <td class="btn1" colSpan="1"  key={"Cliente Foto"}><button class="" onClick={()=>openCloseFoto(obj.datosPersonales.d_foto)}> <img src={obj.datosPersonales.d_foto} alt="" /></button></td>
                      <td className="align-middle"  colSpan="2"key={"Cliente Nombre"}>{obj.datosPersonales.d_nombre}</td>
                      <td className="align-middle"  colSpan="2"key={"Cliente Apellido"}>{obj.datosPersonales.d_apellido}</td>
                      <td className="align-middle"  colSpan="2"key={"Cliente Telefono"}>{obj.datosPersonales.d_telefono}</td>
                      <td className="align-middle"  colSpan="2"key={"Cliente Email"}>{obj.datosPersonales.d_email}</td>
                      <td className="align-middle"  colSpan="2"key={"Cliente Direccion"}>{obj.datosPersonales.d_direccion}</td>
                      
                      <td className="align-middle" >
                        <button className="btn btn-primary" onClick={() => GetPorId(obj.c_id)}>Editar</button>
                        <p></p>
                       
                      </td> 
                    </tr>
                  ))}
                </tbody>
          </table>
          {Modal(modalInsert,encontrado,id,urlclientes,openCloseModalInsert,getClientes)}
          {Modalfotos(camino,modalFoto,openCloseFoto)}
          </div>
        </div>
      </div>
    );
  }
  
  export default Clientes;