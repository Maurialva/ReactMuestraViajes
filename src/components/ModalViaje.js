import React, { useState } from "react"
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalViaje = (modalInsert,encontrado,id,urlviajes,openCloseModalInsert,getViajes,clientes,choferes,metodo) => {

    let modal;
 
    const [valueSelected, setValues] = useState({
      ent_id: 0,
      ent_fecha: new Date(),
      ent_id_cliente: 0,
      ent_id_empleado: 0,
      ent_id_metododepago: 0
    })

    
    const handleClienteChange = e => {
      e.preventDefault();
      let ent_id_cliente =  e.target.value
       
      setValues({
          ...valueSelected, ent_id_cliente: ent_id_cliente
      })
      console.log(e.target.value)
    }
    const handleChoferChange = e => {
      e.preventDefault();
      let ent_id_empleado =  e.target.value
      
      setValues({
          ...valueSelected, ent_id_empleado: ent_id_empleado
      })
      console.log(e.target.value)
    }
    const handleMetodoChange = e => {
      e.preventDefault();
      let ent_id_metododepago =  e.target.value
      
      setValues({
          ...valueSelected, ent_id_metododepago: ent_id_metododepago
      })
      console.log(valueSelected)
    }
    const handleFechaChange = e => {
      const { name, value } = e.target;
      setValues({
        ...valueSelected,
        [name]: new Date(value)
        });
    }
    const placefecha = (ent_fecha) => {
      const nuevaFecha = new Date(ent_fecha);
      return nuevaFecha.toLocaleDateString()
    }
    const Post = async () =>{
      const options = { 
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify ( 
          valueSelected
          )
      };
      await fetch(urlviajes, options);
      openCloseModalInsert();
      getViajes();
    } 
   
    const Put = async (id) =>{
      const options = { 
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify (
          encontrado
          )
      };
      await fetch(urlviajes+id, options);
      openCloseModalInsert();
      getViajes();
    } 

    if (id===0){
      modal = ( <Modal isOpen={modalInsert}>
        <ModalHeader> Cargar Nuevo Viaje </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Fecha del Viaje: </label>
            
            <input type="datetime" className="form-control" name="ent_fecha" onChange={handleFechaChange} placeholder="AAAA/MM/DD"/>
            <br/>
            <label>Cliente: </label>
            <br/>
            <select onChange={handleClienteChange} >
            <option>Seleccione Uno </option>
              {clientes.map(obj=> (
                  <option value={obj.c_id}>{obj.datosPersonales.d_nombre} {obj.datosPersonales.d_apellido } </option>
                  ))}
              </select>
              <br/>
              <label>Chofer: </label>
            <br/>
              <select onChange={handleChoferChange} >
              <option>Seleccione Uno </option>
              {choferes.map(obj=> (
                  <option value={obj.e_id}>{obj.datosPersonales.d_nombre} {obj.datosPersonales.d_apellido }</option>
                  ))}
              </select>
              <br/>
              <label>Metodo de Pago: </label>
            <br/>
              <select onChange={handleMetodoChange} >
              <option>Seleccione Uno </option>
              {metodo.map(obj=> (
                  <option value={obj.m_id}>{obj.m_nombre} </option>
                  ))}
              </select>
              <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => Post()}>Aceptar</button>{"  "}
          <button className="btn btn-danger" onClick={() => openCloseModalInsert()}>Cancelar</button>
        </ModalFooter>
        </Modal> )
      } else {
        modal = ( <Modal isOpen={modalInsert}>
          <ModalHeader> Editar Viaje </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Fecha del Viaje: </label>
              
              <input type="datetime" placeholder={placefecha(encontrado.ent_fecha)} className="form-control" name="ent_fecha" onChange={e => encontrado.ent_fecha = (new Date(e.target.value))} />
              <br/>
              <label>Cliente: </label>
              <br/>
              <select onChange={e => encontrado.ent_id_cliente = (e.target.value)} >
              <option>Seleccione Uno </option>
                {clientes.map(obj=> (
                    <option value={obj.c_id}>{obj.datosPersonales.d_nombre} {obj.datosPersonales.d_apellido } </option>
                    ))}
                </select>
                <br/>
                <label>Chofer: </label>
              <br/>
                <select onChange={e => encontrado.ent_id_empleado = (e.target.value)} >
                <option>Seleccione Uno </option>
                {choferes.map(obj=> (
                    <option value={obj.e_id}>{obj.datosPersonales.d_nombre} {obj.datosPersonales.d_apellido }</option>
                    ))}
                </select>
                <br/>
                <label>Metodo de Pago: </label>
              <br/>
                <select onChange={e => encontrado.ent_id_metododepago = (e.target.value)} >
                <option>Seleccione Uno </option>
                {metodo.map(obj=> (
                    <option value={obj.m_id}>{obj.m_nombre} </option>
                    ))}
                </select>
                <br/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => Put(id)}>Aceptar</button>{"  "}
            <button className="btn btn-danger" onClick={() => openCloseModalInsert()}>Cancelar</button>
          </ModalFooter>
          </Modal> )
      }

return (
    <div> 
        {modal}
    </div>
    )
}

export default ModalViaje;