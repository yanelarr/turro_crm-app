import {
  Row,
  Col,
  FormGroup,
  Label,
  InputGroup,
  Input,
  FormFeedback,
  FormText
} from "reactstrap";

export default function PartnerForm({
  partner,
  validate,
  validForm,
  handleChange,
}) {
  return (
    <div style={{ padding: "8px" }}>
      <Row>
        <Col sm="6">
          <FormGroup>
            <Label for="type">Tipo</Label>
            <InputGroup size="sm">
              <Input
                id="type"
                name="type"
                type="select"
                value={partner.type}
                valid={validate.type === "success"}
                invalid={validate.type === "error"}
                onChange={(e) => {
                  validForm(e);
                  handleChange(e);
                }}
              >
                <option value="">Seleccione...</option>
                <option value="JURIDICO">Jurídico</option>
                <option value="NATURAL">Natural</option>
              </Input>
              <FormFeedback>
                Por favor, seleccione el tipo de cliente.
              </FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="nit">NIT</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="nit"
                id="nit"
                maxLength={11}
                placeholder="NIT"
                valid={validate.ni === "success"}
                invalid={validate.nit === "error"}
                value={partner.nit}
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
              <FormFeedback>Por favor, teclee el DNI del cliente.</FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="name">Nombre del Cliente</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Nombre del Cliente"
                valid={validate.name === "success"}
                invalid={validate.name === "error"}
                value={partner.name}
                onChange={(e) => {
                  validForm(e);
                  handleChange(e);
                }}
                onKeyPress={(event) => {
                  if (!/^[a-zA-ZñÑáéíóú.0-9\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <FormFeedback>
                Por favor, teclee el nombre del cliente.
              </FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="address">Dirección</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="address"
                id="address"
                placeholder="Dirección"
                value={partner.address}
                onChange={(e) => {
                  handleChange(e);
                }}
                onKeyPress={(event) => {
                  if (!/^[a-zA-ZñÑáéíóú.0-9/#\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="dni">DNI/NIF</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="dni"
                id="dni"
                maxLength={11}
                placeholder="DNI/NIF"
                valid={validate.dni === "success"}
                invalid={validate.dni === "error"}
                value={partner.dni}
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
              <FormFeedback>Por favor, teclee el dni del cliente.</FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="email">Correo</Label>
            <InputGroup size="sm">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Correo"
                value={partner.email}
                onChange={(e) => {
                  handleChange(e);
                }}
                onKeyPress={(event) => {
                  if (!/^[a-z@_.\s]*$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </InputGroup>
            <FormText>Desactive el Blooque de Mayúsculas</FormText>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="phone">Teléfono</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="phone"
                id="phone"
                placeholder="Teléfono"
                maxLength={8}
                valid={validate.phone === "success"}
                invalid={validate.phone === "error"}
                value={partner.phone} // value={users.phone}
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
              <FormFeedback>
                Por favor, teclee el teléfono del cliente.
              </FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="movile">Móvil</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Móvil"
                maxLength={8}
                value={partner.mobile}
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
    </div>
  );
}
