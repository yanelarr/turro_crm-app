import {
    Modal,
    ModalBody
} from "reactstrap";
import { HashLoader } from "react-spinners";

const LoadingForm = (props) => {

    return (
        <Modal 
            id={props.id} 
            isOpen={props.open} 
            backdrop={'static'}
            keyboard={true}
            centered={true}
            size={props.size ? props.size : ""}
        >
            <ModalBody>
                <div className="css-15dql7d"><HashLoader color="#36d7b7" size={"30px"} />{props.waitMsg}</div>
            </ModalBody>
        </Modal>
    )
}
export default LoadingForm;