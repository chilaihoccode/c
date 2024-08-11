import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDelete(props) {
    return ( 
        <>
         <Modal show={props.show} onHide={props.handleClose} centered size='sm'>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, Are you sure delete {props.modalData.username} !</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="danger" onClick={props.confirmDeleteData}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
        </> 
    );
}

export default ModalDelete;