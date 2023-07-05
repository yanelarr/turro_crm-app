import { useState, useContext } from "react";
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
  FormText
} from "reactstrap";

export default function AddUserForm({ onAdd, onClose }) {
  const ctx = useContext(AppContext);
  const t = ctx.state.languages.userform;

  const [users, setUsers] = useState({
    username: "",
    fullname: "",
    dni: "",
    job: "",
    email: "",
    phone: "",
    password: ""
  });

  const [validate, setValidate] = useState({
    username: "",
    fullname: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidate({
      ...validate,
      username: users.username != "" ? "success" : "error",
      fullname: users.fullname != "" ? "success" : "error",
      email: users.email != "" ? "success" : "error",
      password: users.password != "" ? "success" : "error",
    });

    if (
      validate.username === "success" &&
      validate.fullname === "success" &&
      validate.password === "success" &&
      validate.email === "success"
    ) {
      onAdd(users);
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
      <ModalHeader toggle={onClose}>{t.newTitle}</ModalHeader>
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
                <FormFeedback>
                  {t.userNameFeed}
                </FormFeedback>
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
                  value={users.dni}
                  onChange={(e) => {
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
              <FormFeedback>
                {t.fullNameFeed}
              </FormFeedback>
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
              <FormFeedback>
                {t.emailFeed}
              </FormFeedback>
            </InputGroup>
            <FormText>
              {t.capsLock}
            </FormText>              
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

          <Col md={6}>
            <FormGroup>
              <Label>{t.password}</Label>
              <InputGroup size="sm">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder={t.password}
                  valid={validate.password === "success"}
                  invalid={validate.password === "error"}
                  value={users.password}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                />
                <FormFeedback>
                  {t.passwordFeed}
                </FormFeedback>
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
