import { useState, useEffect } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Col,
  FormGroup,
  Button,
  Label,
  InputGroup,
  Input,
  FormFeedback,
} from "reactstrap";

import FinderContact from "../Contact/FinderContact";
import FinderPartner from "../Partner/FinderPartner";
import SignUser from "../Users/SignUsers";
import ContractStatus from "./ContractStatus";

export default function EditContractForm({ session, record, onEdit, onClose }) {

  const [contract, setContract] = useState({
    id: "",
    number: "",
    id_partner: "",
    name_partner: "",
    id_contact: "",
    name_contact: "",
    initial_aproved_import: "",
    sign_by: "",
    sign_full_name: "",
    sign_date: "",
    status_name: "",
    status_description: ""
  });

  const [validate, setValidate] = useState({
    number: "",
    id_partner: "",
    id_contact: "",
    initial_aproved_import: "",
    sign_by: "",
    sign_date: "",
    status_name: "",
  });

  useEffect(() => {
    if (record.length > 0) {
      setContract({
        id: record[0].id,
        number: record[0].number,
        id_partner: record[0].partner_id,
        name_partner: record[0].partner,
        id_contact: record[0].contact_id,
        name_contact: record[0].contact,
        initial_aproved_import: record[0].initial_aproved_import,
        sign_by: record[0].sign_by,
        sign_full_name: record[0].sign_full_name,
        sign_date: record[0].sign_date,
        status_description: record[0].status_description,
        status_name: record[0].status_name
      });
    }
  }, [record]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidate({
      ...validate,
      number: contract.number != "" ? "success" : "error",
      id_partner: contract.id_partner != "" ? "success" : "error",
      id_contact: contract.id_contact != "" ? "success" : "error",
      initial_aproved_import:
        contract.initial_aproved_import != "" ? "success" : "error",
      sign_by: contract.sign_by != "" ? "success" : "error",
      sign_date: contract.sign_date != "" ? "success" : "error",
      status_name: contract.status_name != "" ? "success" : "error"
    });

    if (
      validate.number === "success" &&
      validate.id_partner === "success" &&
      validate.id_contact === "success" &&
      validate.initial_aproved_import === "success" &&
      validate.sign_by === "success" &&
      validate.sign_date === "success" &&
      validate.status_name === "success"
    ) {
      onEdit(contract);
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

    setContract({
      ...contract,
      [name]: value,
    });
  };

  const setContact = (record) => {
    setValidate({
      ...validate,
      id_contact: record.id != "" ? "success" : "error",
    });

    setContract({
      ...contract,
      id_contact: record.id,
      name_contact: record.name,
    });
  };

  const setPartner = (record) => {
    setValidate({
      ...validate,
      id_partner: record.id != "" ? "success" : "error",
    });

    setContract({
      ...contract,
      id_partner: record.id,
      name_partner: record.name,
      id_contact: "",
      name_contact: ""
    });
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <ModalHeader toggle={onClose}>Editar Contrato</ModalHeader>
      <ModalBody>
        <Col md={12}>
          <FormGroup>
            <Label for="number">Número</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="number"
                id="number"
                maxLength={8}
                placeholder="Número de Contrato"
                valid={validate.number === "success"}
                invalid={validate.number === "error"}
                value={contract.number}
                onChange={(e) => {
                  validForm(e);
                  handleChange(e);
                }}
                onKeyPress={(event) => {
                  if (!/[0-9/-]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>
                Por favor, teclee el número del contrato.
              </FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md={12}>
          <FormGroup>
            <Label for="id_partner">Cliente</Label>
            <FinderPartner session={session} id={"id_partner"} changePartner={setPartner} contract={contract} />
          </FormGroup>
        </Col>
        <Col md={12}>
          <FormGroup>
            <Label for="id_contact">Contácto</Label>
            <FinderContact
              session={session} 
              id={"id_contact"}
              changeContact={setContact}
              contract={contract}
            />
          </FormGroup>
        </Col>
        <Col md={12}>
          <FormGroup>
            <Label for="initial_aproved_import">Monto Contratado</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="initial_aproved_import"
                id="initial_aproved_import"
                maxLength={8}
                placeholder="Monto Contratado"
                valid={validate.initial_aproved_import === "success"}
                invalid={validate.initial_aproved_import === "error"}
                value={contract.initial_aproved_import}
                onChange={(e) => {
                  validForm(e);
                  handleChange(e);
                }}
                onKeyPress={(event) => {
                  if (!/[0-9.]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>
                Por favor, teclee el monto contratado.
              </FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md={12}>
          <FormGroup>
            <Label for="sign_by">Firmado por</Label>
            <SignUser
              session={session} 
              id={"sign_by"}
              handleChange={handleChange}
              validForm={validForm}
              valDefault={contract.sign_by}
            />
          </FormGroup>
        </Col>
        <Col md={12}>
          <FormGroup>
            <Label for="sign_date">Fecha</Label>
            <InputGroup size="sm">
              <Input
                id="sign_date"
                name="sign_date"
                placeholder="Fecha de Firma"
                type="date"
                value={contract.sign_date}
                onChange={(e) => {
                  validForm(e);
                  handleChange(e);
                }}
              />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col sm="12">
          <FormGroup>
            <Label for="status_name">Estado</Label>
            <ContractStatus
              session={session} 
              id={"status_name"}
              handleChange={handleChange}
              validForm={validForm}
              valDefault={contract.status_name}
            />
          </FormGroup>
        </Col>
      </ModalBody>
      <ModalFooter>
        <Button type="button" onClick={onClose} color="secondary">
          <i className="bi bi-x-circle"></i> Cerrar
        </Button>
        <Button type="submit" color="primary">
          <i className="bi bi-check2-circle"></i> Grabar
        </Button>
      </ModalFooter>
    </Form>
  );
}
