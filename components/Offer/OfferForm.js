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

import { formatNumber, numFormat } from "../../data";

export default function OfferForm({
  offer,
  validate,
  validForm,
  handleChange,
}) {
  return (
    <div style={{ padding: "8px" }}>
      <Row>
        <Col sm="12">
          <FormGroup>
            <Label for="code">Código</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="code"
                id="code"
                maxLength={15}
                placeholder="Código"
                valid={validate.code === "success"}
                invalid={validate.code === "error"}
                value={offer.code}
                onChange={(e) => {
                  validForm(e);
                  handleChange(e);
                }}
              />
              <FormFeedback>
                Por favor, teclee el código de la oferta.
              </FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
        {/* <Col md={6}>
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
                value={offer.nit}
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
        </Col> */}
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="name">Nombre de la Oferta</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Nombre..."
                valid={validate.name === "success"}
                invalid={validate.name === "error"}
                value={offer.name}
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
                Por favor, teclee el nombre de la oferta.
              </FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="description">Descripción de la Oferta</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="description"
                id="description"
                placeholder="Descripción..."
                value={offer.description}
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
            <Label for="cost_price">Precio de Costo</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="cost_price"
                id="cost_price"
                // valid={validate.cost_price === "success"}
                // invalid={validate.cost_price === "error"}
                value={formatNumber(offer.cost_price)}
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
              <FormFeedback>Por favor, teclee el precio de costo.</FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="sale_price">Precio de Venta</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="sale_price"
                id="sale_price"
                placeholder="Precio de Venta..."
                value={formatNumber(offer.sale_price)}
                valid={validate.cost_price === "success"}
                invalid={validate.cost_price === "error"}
                onChange={(e) => {
                  handleChange(e);
                }}
                onKeyPress={(event) => {
                  if (/[^0-9.]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </InputGroup>
            {/* <FormText>Desactive el Blooque de Mayúsculas</FormText> */}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="ledger_account">Cuenta Contable</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="ledger_account"
                id="ledger_account"
                placeholder="Cuenta Contable..."
                maxLength={15}
                // valid={validate.ledger_account === "success"}
                // invalid={validate.ledger_account === "error"}
                value={offer.ledger_account} 
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
              {/* <FormFeedback>
                Por favor, teclee el teléfono del cliente.
              </FormFeedback> */}
            </InputGroup>
          </FormGroup>
        </Col>
        {/* <Col md={6}>
          <FormGroup>
            <Label for="movile">Móvil</Label>
            <InputGroup size="sm">
              <Input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Móvil"
                maxLength={8}
                value={offer.mobile}
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
        </Col> */}
      </Row>
    </div>
  );
}
