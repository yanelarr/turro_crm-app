import { useState, useEffect, useRef } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  InputGroup,
  Input,
  FormFeedback
} from "reactstrap";

import axios from "axios";
import Swal from 'sweetalert2'
import { numFormat, formatNumber } from "../../data";

export default function AddProductForm({ session, onAdd, onClose }) {
  const mounted = useRef(false);
  const [filter, setFilter] = useState({
    criteria_key: "",
    criteria_value: "",
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": session.locale,
      "Authorization": `Bearer ${session.token}`,
    },
  };  

  const [product, setProduct] = useState({
    id: "",
    code: "",
    name: "",
    description: "",
    cost_price: "",
    sale_price: "",
    measure_id: ""
  });

  const [validate, setValidate] = useState({
    code: "",
    name: "",
    description: ""
    
  }); 
  
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/measure/services`;      
      try {
        const { data } = await axios.get(url, config);
        console.log(data.result.data)
        setMeasures(data.result.data);
      } catch (error) {
        console.log(error);
        // setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al consultar la API',
          showConfirmButton: true,
        });
      }
    };
    
    if (!mounted.current) {
      mounted.current = true;
      fetchData();
    }
    
  });

  const productSubmit = async (e) => {
    e.preventDefault();

    setValidate({
      ...validate,
      code: product.code != "" ? "success" : "error",
      name: product.name != "" ? "success" : "error",
      description: product.description != "" ? "success" : "error"      
    });

    if (
      validate.code === "success" &&
      validate.name === "success" &&
      validate.description === "success"       
    ) {
      onAdd(product);
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

    setProduct({
      ...product,
      [name]: value,
    });
  };

    
  return (
    <Form className="form" onSubmit={productSubmit}>
      <ModalHeader toggle={onClose}>Nuevo Producto</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <FormGroup>
              <Label>Código</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="code"
                  id="code"
                  placeholder="Código"
                  valid={validate.code === "success"}
                  invalid={validate.code === "error"}
                  value={product.name}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                  onKeyPress={(event) => {
                    if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>
                  Por favor teclee el código del producto.
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Nombre</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nombre"
                  valid={validate.job === "success"}
                  invalid={validate.job === "error"}
                  value={product.description}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                  onKeyPress={(event) => {
                    if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>
                  Por favor teclee el nombre del producto.
                </FormFeedback>           
              </InputGroup>
            </FormGroup>          
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Descripción</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Descripción"
                  valid={validate.address === "success"}
                  invalid={validate.address === "error"}
                  value={product.description}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                />
                <FormFeedback>
                  Por favor teclee la descripción del producto.
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Unidad de Medida</Label>
              <InputGroup size="sm">
                <Input
                  id="measure_id"
                  name="measure_name"
                  type="select"
                  value={filter.criteria_key}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                >
                  <option value="">Seleccione...</option>
                  {measures.map((measures) => {
                    return (
                      <option key={measures.id} value={measures.id}>
                        {measures.description}
                      </option>
                    );
                  })}
                </Input> 
                <FormFeedback>
                  Por favor seleccione la unidad de medida.
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>          
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Precio Costo</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="cost_price"
                  id="cost_price"
                  placeholder="Precio Costo"
                  // valid={validate.cost_price === "success"}
                  // invalid={validate.cost_price === "error"}
                  value={formatNumber(product.cost_price)}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}  
                  onKeyPress={(event) => {
                    if (/[^0-9.]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />                
              </InputGroup>
            </FormGroup>          
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Precio Venta</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="sale_price"
                  id="sale_price"
                  placeholder="Precio Ventas"
                  // maxLength={8}
                  // valid={validate.mobile === "success"}
                  // invalid={validate.mobile === "error"}
                  value={formatNumber(product.sale_price)}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                  onKeyPress={(event) => {
                    if (/[^0-9.]/.test(event.key)) {
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
          <i className="bi bi-x-circle"></i> Cerrar
        </Button>
        <Button type="submit" color="primary">
          <i className="bi bi-check2-circle"></i> Aceptar
        </Button>
      </ModalFooter>
    </Form>
  );
}
