import { Modal, Button } from "react-bootstrap";
import { IModalProps } from "../interfaces";

export const ModalComponent: React.FC<IModalProps> = ({onClose, onShow, onClickButton, modalTitle, success, info}) => {
  return (
    <Modal show={onShow} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        {info === true ? <Button variant= 'primary' onClick={onClickButton}>
          Confirmar usuário
        </Button> : 
        <Button variant={success === true ? 'success' : 'danger'} onClick={onClose}>
          Fechar
        </Button>}
      </Modal.Footer>
    </Modal>
  )
}