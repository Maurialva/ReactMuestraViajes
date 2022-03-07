import React, { useState } from "react"
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
const ModalViaje = (modalInsert,encontrado,id,urlclientes,openCloseModalInsert,getClientes) => {

  let modal;

  const [valueSelected, setValues] = useState({
    c_id: 0,
    datosPersonales: {
      d_id: 0,
      d_nombre: "string",
      d_apellido: "string",
      d_telefono: "string",
      d_email: "string",
      d_direccion: "string",
      d_foto: "string"
    }
  })
const [datos, setDatos]= useState({

  d_id: 0,
      d_nombre: "string",
      d_apellido: "string",
      d_telefono: "string",
      d_email: "string",
      d_direccion: "string",
      d_foto: "string"
})

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setDatos({
      ...datos,[name]:value
    })
    setValues({
        ...valueSelected, 
        datosPersonales : datos
    })

}

  const Post = async () =>{
 
    const options = { 
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify ( 
        valueSelected
        )
        
    };
    await fetch(urlclientes, options);
    openCloseModalInsert();
    getClientes();
  } 
 
  const Put = async (id) =>{
    const options = { 
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify (
        encontrado
        )
    };
    await fetch(urlclientes+id, options);
    openCloseModalInsert();
    getClientes();
  } 

 if (id===0){
    modal = ( <Modal isOpen={modalInsert}>
      <ModalHeader> Cargar Nuevo Cliente </ModalHeader>
      <ModalBody>
        <div className="form-group">
          
          <label>Nombre: </label>
          
          <input type="text" className="form-control" name="d_nombre" onChange={handleChange} />
          <br/>
          <label>Apellido: </label>
          
          <input type="text" className="form-control" name="d_apellido" onChange={handleChange} />
          <br/>
          <label>Telefono: </label>
          
          <input type="text" className="form-control" name="d_telefono" onChange={handleChange} />
          <br/>
          <label>Email: </label>
          
          <input type="text" className="form-control" name="d_email" onChange={handleChange} />
          <br/>
          <label>Direccion: </label>
          
          <input type="text" className="form-control" name="d_direccion" onChange={handleChange} />
          <br/>
          <label>Nombre de la foto: </label>
          
          <input type="text" className="form-control" name="d_foto" onChange={handleChange} />
          <br/>


        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={() => Post()}>Aceptar</button>{"  "}
        <button className="btn btn-danger" onClick={() => openCloseModalInsert()}>Cancelar</button>
      </ModalFooter>
      </Modal> )
    } else {modal = ( <Modal isOpen={modalInsert}>
      <ModalHeader> Modificar Cliente </ModalHeader>
      <ModalBody>
        <div className="form-group">
          
          <label>Nombre: </label>
          
          <input type="text" placeholder={encontrado.datosPersonales.d_nombre} className="form-control" name="d_nombre" onChange={e => encontrado.datosPersonales.d_nombre = (e.target.value)} />
          <br/>
          <label>Apellido: </label>
          
          <input type="text" placeholder={encontrado.datosPersonales.d_apellido} className="form-control" name="d_apellido" onChange={e => encontrado.datosPersonales.d_apellido = (e.target.value)} />
          <br/>
          <label>Telefono: </label>
          
          <input type="text" placeholder={encontrado.datosPersonales.d_telefono}  className="form-control" name="d_telefono" onChange={e => encontrado.datosPersonales.d_telefono = (e.target.value)} />
          <br/>
          <label>Email: </label>
          
          <input type="text" placeholder={encontrado.datosPersonales.d_email} className="form-control" name="d_email" onChange={e => encontrado.datosPersonales.d_email = (e.target.value)} />
          <br/>
          <label>Direccion: </label>
          
          <input type="text" placeholder={encontrado.datosPersonales.d_direccion} className="form-control" name="d_direccion" onChange={e => encontrado.datosPersonales.d_direccion = (e.target.value)} />
          <br/>
          <label>Nombre de la foto: </label>
          
          <input type="text" placeholder={encontrado.datosPersonales.d_foto} className="form-control" name="d_foto" onChange={e => encontrado.datosPersonales.d_foto = (e.target.value)} />
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