import {
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Button,
} from "reactstrap";

const DeleteForm = ({title, onDelete, onClose}) => {

    return (
        <Form className="form" onSubmit={onDelete}>
          <ModalHeader toggle={onClose}>{title}</ModalHeader>
            <ModalBody>
                <p>¿ Estás seguro que deseas eliminar este Registro ?</p>
                <p className="text-warning"><small>Esta acción no se puede deshacer.</small></p>
            </ModalBody>
            <ModalFooter>
                <Button type="button" onClick={onClose} color="secondary">
                    <i className="bi bi-x-circle"></i> Cerrar
                </Button>
                <Button type="submit" color="primary">
                    <i className="bi bi-check2-circle"></i> Eliminar
                </Button>
            </ModalFooter>
        </Form>
    )
}
export default DeleteForm;