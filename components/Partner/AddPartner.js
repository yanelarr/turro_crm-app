import { useState } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";

import classnames from "classnames";
import PartnerForm from "./PartnerForm";
import ContactForm from "./ContactForm";

export default function AddPartnerForm({ session, onAdd, onClose }) {
  const [partner, setPartner] = useState({
    id: "",
    type: "",
    name: "",
    address: "",
    dni: "",
    email: "",
    phone: "",
    mobile: "",
    nit: "",
    contacts: [],
  });

  const [validate, setValidate] = useState({
    type: "",
    name: "",
    address: "",
    phone: "",
  });

  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
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

    setPartner({
      ...partner,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidate({
      ...validate,
      type: partner.type != "" ? "success" : "error",
      name: partner.name != "" ? "success" : "error",
      address: partner.address != "" ? "success" : "error",
      phone: partner.phone != "" ? "success" : "error",
    });

    if (
      validate.type === "success" &&
      validate.name === "success" &&
      validate.address === "success" &&
      validate.phone === "success"
    ) {
      onAdd(partner);
    }
  };

  const setContacts = (contacts) => {
    partner.contacts = contacts;
    setPartner(partner);
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <ModalHeader toggle={onClose}>Nuevo Cliente</ModalHeader>
      <ModalBody>
        <Nav tabs>
          <NavItem>
            <NavLink
              href="#"
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggleTab("1");
              }}
            >
              Cliente
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggleTab("2");
              }}
            >
              Contáctos
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <PartnerForm
              partner={partner}
              validate={validate}
              validForm={validForm}
              handleChange={handleChange}
            />
          </TabPane>
          <TabPane tabId="2">
            <ContactForm
              session={session}
              setContacts={setContacts}
              partner_id={partner.id}
              onClose={onClose}
            />
          </TabPane>
        </TabContent>
      </ModalBody>
      <ModalFooter>
        <Button type="button" onClick={onClose} color="secondary">
          <i className="bi bi-x-circle"></i> Cerrar
        </Button>
        <Button type="submit" color="primary">
          <i className="bi bi-check2-circle"></i> Salvar
        </Button>
      </ModalFooter>
    </Form>
  );
}
