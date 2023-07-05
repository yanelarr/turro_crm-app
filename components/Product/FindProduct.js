import { useState } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Row,
  Col,
  InputGroup,
  Button,
} from "reactstrap";


export default function FindProductForm({onFind, onClose }) {

  const [filter, setFilter] = useState({
    criteria_key: "",
    criteria_value: "",
  });

  const [validate, setValidate] = useState({
    criteria_key: "",
    criteria_value: ""
  });


  const Find = (e) => {
    e.preventDefault();

    setValidate({
      ...validate,
      criteria_key: filter.criteria_key != "" ? "success" : "error",
      criteria_value: filter.criteria_value != "" ? "success" : "error"
    });

    if (validate.criteria_key === "success" && validate.criteria_value === "success") {
      onFind(filter);
    }
  };

  const validForm = (event) => {
    const { target } = event;
    const value = target.value;
    const { name } = target;

    setValidate({
      ...validate,
      [name]: value != "" ? "success" : "error",
    });
  };

  const handleChange = (event) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;

    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <Form className="form" onSubmit={Find}>
      <ModalHeader toggle={onClose}>Filtrar</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="key">
                Filtrar por
              </Label>
              <InputGroup size="sm">
                <Input
                  id="criteria_key"
                  name="criteria_key"
                  type="select"
                  value={filter.criteria_key}
                  valid={validate.criteria_key === "success"}
                  invalid={validate.criteria_key === "error"}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                >
                  <option value="">Seleccione...</option>
                  <option value="code">Code</option>
                  <option value="name">Nombre</option>                  
                </Input> 
                <FormFeedback>
                  Por favor entre el críterio para el filtro.
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="key">
                Valor
              </Label>
              <InputGroup size="sm">
                <Input
                  id="criteria_value"
                  name="criteria_value"
                  type="text"
                  value={filter.criteria_value}
                  valid={validate.criteria_value === "success"}
                  invalid={validate.criteria_value === "error"}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                >
                </Input>              
                <FormFeedback>
                  Por favor teclee el valor del críterio para el filtro.
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button type="button" onClick={onClose} color="secondary">
          <i className="bi bi-x-circle"></i> Cerrar
        </Button>
        <Button type="submit" color="primary">
          <i className="bi bi-check2-circle"></i> Aceptar
        </Button>
      </ModalFooter>
    </Form>
  );
}
