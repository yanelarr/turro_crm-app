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
import OfferForm from "./OfferForm";
import ProductForm from "./ProductForm";

export default function AddOfferForm({ session, onAdd, onClose }) {
  const [offer, setOffer] = useState({
    id: "",
    code: "",
    name: "",
    description: "",
    cost_price: "",
    sale_price: "",
    ledger_account: "",
    products: []
  });

  const [validate, setValidate] = useState({
    code: "",
    name: "",
    description: "",
    sale_price: ""
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

    setOffer({
      ...offer,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidate({
      ...validate,
      code: offer.code != "" ? "success" : "error",
      name: offer.name != "" ? "success" : "error",
      description: offer.description != "" ? "success" : "error",
      sale_price: offer.sale_price != "" ? "success" : "error",
    });

    if (
      validate.code === "success" &&
      validate.name === "success" &&
      validate.description === "success" &&
      validate.sale_price === "success"
    ) {
      onAdd(offer);
    }
  };

  const setProducts = (products) => {
    offers.products = products;
    setOffer(offer);
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <ModalHeader toggle={onClose}>Nueva Oferta</ModalHeader>
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
              Oferta
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
              Productos
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <OfferForm
              offer={offer}
              validate={validate}
              validForm={validForm}
              handleChange={handleChange}
            />
          </TabPane>
          <TabPane tabId="2">
            <ProductForm
              session={session}
              setProducts={setProducts}
              offer_id={offer.id}
              onClose={onClose}
            />
          </TabPane>
        </TabContent>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="primary">
          <i className="bi bi-check2-circle"></i> Salvar
        </Button>
        <Button type="button" onClick={onClose} color="secondary">
          <i className="bi bi-x-circle"></i> Cerrar
        </Button>        
      </ModalFooter>
    </Form>
  );
}
