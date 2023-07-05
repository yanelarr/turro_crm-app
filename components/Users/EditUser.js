import { useState, useEffect, useContext } from "react";
import AppContext from "../../AppContext";
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
  FormText,
} from "reactstrap";

export default function EditUserForm({ record, onEdit, onClose }) {
  const ctx = useContext(AppContext);
  const t = ctx.state.languages.userform;

  const [users, setUsers] = useState({
    id: "",
    username: "",
    fullname: "",
    dni: "",
    job: "",
    email: "",
    phone: "",
    password: "",
  });

  const [validate, setValidate] = useState({
    username: "",
    fullname: "",
    dni: "",
    email: "",
  });

  useEffect(() => {
    if (record.length > 0) {
      setUsers({
        id: record[0].id,
        username: record[0].username,
        fullname: record[0].fullname,
        dni: record[0].dni,
        job: record[0].job,
        email: record[0].email,
        phone: record[0].phone,
      });
      setValidate({
        username: record[0].username != "" ? "success" : "error",
        fullname: record[0].fullname != "" ? "success" : "error",
        dni: record[0].dni != "" ? "success" : "error",
        email: record[0].email != "" ? "success" : "error",
      });
    }
  }, [record]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidate({
      ...validate,
      username: users.username != "" ? "success" : "error",
      dni: users.dni != "" ? "success" : "error",
      fullname: users.fullname != "" ? "success" : "error",
      email: users.email != "" ? "success" : "error",
    });

    if (
      validate.username === "success" &&
      validate.dni === "success" &&
      validate.fullname === "success" &&
      validate.email === "success"
    ) {
      onEdit(users);
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

    setUsers({
      ...users,
      [name]: value,
    });
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <ModalHeader toggle={onClose}>{t.editTitle}</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>{t.userName}</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder={t.userName}
                  valid={validate.username === "success"}
                  invalid={validate.username === "error"}
                  value={users.username}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                  onKeyPress={(event) => {
                    if (!/^[a-zñ_.\s]*$/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>{t.userNameFeed}</FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>{t.dni}</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="dni"
                  id="dni"
                  maxLength={11}
                  placeholder={t.dni}
                  valid={validate.dni === "success"}
                  invalid={validate.dni === "error"}
                  value={users.dni}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>{t.dniFeed}</FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>

        <Col md={12}>
          <FormGroup>
            <Label>{t.fullName}</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="fullname"
                id="fullname"
                placeholder={t.fullName}
                valid={validate.fullname === "success"}
                invalid={validate.fullname === "error"}
                value={users.fullname}
                onChange={(e) => {
                  validForm(e);
                  handleChange(e);
                }}
                onKeyPress={(event) => {
                  if (!/^[a-zA-ZñÑáéíóú\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>{t.fullNameFeed}</FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>

        <Col md={12}>
          <FormGroup>
            <Label>{t.job}</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="job"
                id="job"
                placeholder={t.job}
                value={users.job}
                onChange={(e) => {
                  handleChange(e);
                }}
                onKeyPress={(event) => {
                  if (!/^[a-zA-ZñÑáéíóú\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </InputGroup>
          </FormGroup>
        </Col>

        <Col md={12}>
          <FormGroup>
            <Label>{t.email}</Label>
            <InputGroup size="sm">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder={t.email}
                valid={validate.email === "success"}
                invalid={validate.email === "error"}
                value={users.email}
                onChange={(e) => {
                  validForm(e);
                  handleChange(e);
                }}
                onKeyPress={(event) => {
                  if (!/^[a-z@_.\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>{t.emailFeed}</FormFeedback>
            </InputGroup>
            <FormText>{t.capsLock}</FormText>
          </FormGroup>
        </Col>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>{t.phone}</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder={t.phone}
                  maxLength={8}
                  value={users.phone}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>

      <ModalFooter>
        <Button type="button" onClick={onClose} color="secondary">
          <i className="bi bi-x-circle"></i> {t.btnClose}
        </Button>
        <Button type="submit" color="primary">
          <i className="bi bi-check2-circle"></i> {t.btnSubmit}
        </Button>
      </ModalFooter>
    </Form>
  );
}
