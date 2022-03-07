import React, { useState } from "react"
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
const ModalChofer = (modalInsert,encontrado,id,urlchoferes,openCloseModalInsert,getChoferes,autos,clases) => {

  let modal;

  const [valueSelected, setValues] = useState({
    e_id: 0,
    registro: {
      r_id: 0,
      r_clase_id: 0,
      vencimiento: new Date(),
    },
    e_automovil_id: 0,
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

const [registro, setRegistro]= useState({

  r_id: 0,
  r_clase_id: 0,
  vencimiento: new Date(),
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

const handleAutoChange = e => {
  e.preventDefault();
  const {value} = e.target;
  let e_automovil_id=value
  setValues({
      ...valueSelected, 
      e_automovil_id : e_automovil_id
  })
  console.log(valueSelected);

}

const handleRegistroChange = e => {
  e.preventDefault();
  const { name, value } = e.target;
  setRegistro({
    ...registro,[name]:new Date(value)
  })
  setValues({
      ...valueSelected, 
      registro : registro
  })
  console.log(valueSelected);
}
const handleClaseChange = e => {
  e.preventDefault();
  const { value } = e.target;
  let r_clase_id=value
  setRegistro({
    ...registro,r_clase_id:r_clase_id
  })
  setValues({
      ...valueSelected, 
      registro : registro
  })
  console.log(valueSelected);
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
    await fetch(urlchoferes, options);
    console.log(valueSelected);
    openCloseModalInsert();
    getChoferes();
  } 
 
  const Put = async (id) =>{
    const options = { 
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify (
        encontrado
        )
    };
    await fetch(urlchoferes+id, options);
    openCloseModalInsert();
    getChoferes();
  } 



 if (id===0){
    modal = ( <Modal isOpen={modalInsert}>
      <ModalHeader> Cargar Nuevo Chofer </ModalHeader>
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
          <label>Vencimiento de Licencia: </label>
          
          <input type="datetime" className="form-control" placeholder="AAAA/MM/DD" name="vencimiento" onChange={handleRegistroChange} />
          <br/>
          <label>Tipo de Licencia: </label>
            <br/>
              <select onChange={handleClaseChange} >
             
              {clases.map((obj,index)=> (
                  <option value={index} name="r_clase_id">{obj.clase_nombre}</option>
                  ))}
              </select>
              <br/>
          <label>Auto: </label>
            <br/>
              <select onChange={handleAutoChange} >
             
              {autos.map((obj,index)=> (
                  <option value={index} >{obj.a_marca} {obj.a_modelo} {obj.a_patente}</option>
                  ))}
              </select>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={() => Post()}>Aceptar</button>{"  "}
        <button className="btn btn-danger" onClick={() => openCloseModalInsert()}>Cancelar</button>
      </ModalFooter>
      </Modal> )
    } else { modal = ( <Modal isOpen={modalInsert}>
      <ModalHeader> Modificar Chofer </ModalHeader>
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
          <label>Vencimiento de Licencia: </label>
          
          <input type="datetime" className="form-control" placeholder={placefecha(encontrado.registro.vencimiento)} name="vencimiento" onChange={e => encontrado.registro.vencimiento= (new Date(e.target.value))} />
          <br/>
          <label>Tipo de Licencia: </label>
            <br/>
              <select onChange={e => encontrado.registro.r_clase_id = (e.target.value)} >
              <option>Seleccione Una </option>
              {clases.map((obj,index)=> (
                  <option value={index} name="r_clase_id">{obj.clase_nombre}</option>
                  ))}
              </select>
              <br/>
          <label>Auto: </label>
            <br/>
              <select onChange={e => encontrado.e_automovil_id = (e.target.value)} >
              <option>Seleccione Uno </option>
              {autos.map((obj,index)=> (
                  <option value={index} >{obj.a_marca} {obj.a_modelo} {obj.a_patente}</option>
                  ))}
              </select>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={() => Put(id)}>Modificar</button>{"  "}
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

export default ModalChofer;