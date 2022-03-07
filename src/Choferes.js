import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";

import Modalfotos from './components/ModalFoto';
import Modal from './components/ModalChofer';


const Choferes = () => {
 //api entity
 
 /*  const urlautos = "https://localhost:44351/api/Autoes/";
  const urlchoferes = "https://localhost:44351/api/Empleadoes/";
  const urlclasesderegistros= "https://localhost:44351/api/ClaseDeRegistroes/";*/

//api a mano

 const urlautos = "https://localhost:44311/api/Autos/";
  const urlchoferes = "https://localhost:44311/api/Empleados/";
  const urlclasesderegistros= "https://localhost:44311/api/ClaseDeRegistros/";

  
 
  const [autos, setAutos] = useState([]);
  const [choferes, setChoferes] = useState([]);
  const [clases, setClases] = useState([]);
  const [encontrado, setEncontrado] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalFoto, setModalFoto] = useState(false);
  const [camino, setCamino] = useState();
  const [id,setId] = useState(0);

    const getChoferes = (async () => {
      const response = await fetch(urlchoferes);
      const json = await response.json();
     
      setChoferes(json);
     
    })
    const getAutos = (async () => {
      const response = await fetch(urlautos);
      const json = await response.json();
     
      setAutos(json);
    })
    const getClases = (async () => {
      const response = await fetch(urlclasesderegistros);
      const json = await response.json();
     
      setClases(json);
    })
  
    const openCloseFoto = (caminofoto) => {
      setCamino(caminofoto)
       setModalFoto(!modalFoto)
    }
  

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
      getChoferes();
      getAutos();
      getClases();

    }, [] ) 

    const GetPorId = async (id) => {
      const response = await fetch(urlchoferes+id);
      const json = await response.json();
      setEncontrado(json);
      openCloseModalInsert(id);
      }

  
      const mostrarRegistro = (clase_id) => {
        const Clase = clases.filter(function(element){
          return element.clase_id === clase_id;
        });
       if(typeof Clase === 'undefined'){
          return '';
          }else{
            if(typeof Clase[0] === 'undefined')
            return '';
            else{
              
        return Clase[0];
            }
        
          }
         }
      const mostrarAuto = (a_id) => {
        const auto = autos.filter(function(element){
          return element.a_id === a_id;
        });
        if(typeof auto === 'undefined'){
          return '';
          }else{
            if(typeof auto[0] === 'undefined')
            return '';
            else{
              
              return auto[0];
            }
        
          }
      }
  
      const placefecha = (ent_fecha) => {
        const nuevaFecha = new Date(ent_fecha);
        return nuevaFecha.toLocaleDateString()
      }
    return (
      <div className="App">
        <div className="container">
        <br></br>
        <h1>CHOFERES</h1>
          <div className="row">
            
            <div className="col">
              <button className="btn btn-success" onClick={()=>openCloseModalInsert(0)}>Nuevo Chofer</button>
            </div>
          </div>
          <br></br>
          <div className="row">
              <table className="table table-bordered">
              <thead>
                  <tr>
                    <th className="align-middle" scope="col" rowSpan="2">Foto</th>
                    <th scopename="col" colSpan="5"> Datos Personales</th>
                    <th scopename="col" colSpan="3">Licencia</th>
                    <th scopename="col" colSpan="4">Auto</th>
                    <th className="align-middle" scope="col" rowSpan="2">Opciones</th>
                  </tr>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Email</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">Numero</th>
                    <th scope="col">Clase</th>
                    <th scope="col">Vencimiento</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Año</th>
                    <th scope="col">Patente</th>

                  </tr>
                </thead>
                <tbody>
                  {choferes.map(obj=> (
                    <tr>
                      <td key={"Chofer Foto"}> <button onClick={()=>openCloseFoto(obj.datosPersonales.d_foto)}> <img src={obj.datosPersonales.d_foto} alt="" /></button> </td>
                      <td className="align-middle" key={"Chofer Nombre"}>{obj.datosPersonales.d_nombre}</td>
                      <td className="align-middle" key={"Chofer Apellido"}>{obj.datosPersonales.d_apellido}</td>
                      <td className="align-middle" key={"Chofer Telefono"}>{obj.datosPersonales.d_telefono}</td>
                      <td className="align-middle" key={"Chofer Email"}>{obj.datosPersonales.d_email}</td>
                      <td className="align-middle" key={"Chofer Direccion"}>{obj.datosPersonales.d_direccion}</td>
                      <td className="align-middle" key={"Chofer Numero"}>{obj.registro.r_id}</td>
                      <td className="align-middle" key={"Chofer Clase"}>{mostrarRegistro(obj.registro.r_clase_id).clase_nombre}</td>
                      <td className="align-middle" key={"Chofer Vencimiento"}>{placefecha(obj.registro.vencimiento)}</td>
                      <td className="align-middle" key={"Chofer Marca"}>{mostrarAuto(obj.e_automovil_id).a_marca}</td>
                      <td className="align-middle" key={"Chofer Modelo"}>{mostrarAuto(obj.e_automovil_id).a_modelo}</td>
                      <td className="align-middle" key={"Chofer Anio"}>{mostrarAuto(obj.e_automovil_id).a_generacion}</td>
                      <td className="align-middle" key={"Chofer Patente"}>{mostrarAuto(obj.e_automovil_id).a_patente}</td>
                      <td className="align-middle" >
                        <button className="btn btn-primary " onClick={() => GetPorId(obj.e_id)}>Editar</button>
                        <p></p>
                       
                      </td> 
                    </tr>
                  ))}
                </tbody>
          </table>
          {Modal(modalInsert,encontrado,id,urlchoferes,openCloseModalInsert,getChoferes,autos,clases)}
          {Modalfotos(camino,modalFoto,openCloseFoto)}
          </div>
        </div>
      </div>
    );
  }
  
  export default Choferes;