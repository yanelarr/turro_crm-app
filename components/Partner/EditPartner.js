import { useState, useEffect } from "react";
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
  Button
} from "reactstrap";

import classnames from "classnames";
import PartnerForm from "./PartnerForm";
import ContactForm from "./ContactForm";

export default function EditPartnerForm({session, record, onEdit, onClose}) {
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
        contacts: []
    });

    const [validate, setValidate] = useState({
        type: "",
        name: "",
        dni: "",
        phone: "",
        nit: "",
    });
    
    const [activeTab, setActiveTab] = useState("1");

    useEffect(()=>{
        if (record.length > 0) {
            setPartner({
                id: record[0].id,
                type: record[0].type,
                name: record[0].name,
                address: record[0].address,
                dni: record[0].dni,
                email: record[0].email,
                phone: record[0].phone,
                mobile: record[0].mobile,
                nit: record[0].nit,
                contacts: record[0].contacts
            })
        }
    }, [record]);

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
          dni: partner.dni != "" ? "success" : "error",
          phone: partner.phone != "" ? "success" : "error",
          nit: partner.nit != "" ? "success" : "error",
        });
    
        if (
          validate.type === "success" &&
          validate.name === "success" &&
          validate.dni === "success" &&
          validate.phone === "success" &&
          validate.nit === "success"
        ) {
            onEdit(partner);
        }
    };

    const setContacts = (contacts) => {
      partner.contacts = contacts
      setPartner(partner);
    }    

    return (
        <Form className="form" onSubmit={handleSubmit}>
          <ModalHeader toggle={onClose}>Editar Cliente</ModalHeader>
          <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
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
                <ContactForm session={session} setContacts={setContacts} partner_id={partner.id} />
            </TabPane>
          </TabContent>
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
    )

};
