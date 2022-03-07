
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
const ModalFoto = (camino,modalFoto,openCloseFoto) => {

  let modal = (
    <Modal isOpen={modalFoto}>
      <ModalHeader> FOTO </ModalHeader>
      <ModalBody>
        <div className="form-group">
        
        <img src={camino} alt=""/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={() => openCloseFoto()}>Cerrar</button>
      </ModalFooter>
      </Modal>
  )
  return (
    <div> 
        {modal}
    </div>
    )

}

export default ModalFoto;