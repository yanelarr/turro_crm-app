import { useState, useEffect } from "react";

import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Button,
  InputGroup,
  InputGroupText,
  Input,
  FormFeedback,
  FormGroup,
  Label,
} from "reactstrap";

import ModalForm from "../Core/ModalForm";
import DataTable from "../Core/DataTable";
import Pagination from "../Core/Pagination";
import axios from "axios";
import { HashLoader } from "react-spinners";
import Swal from 'sweetalert2'

const columns = [
  { id: 1, title: "Code", accessor: "code" },
  { id: 2, title: "name", accessor: "name" },
];

export default function FinderOffer({ session, id, changeOffer, product }) {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState(null);
  const [partner, setPartner] = useState("");
  const [openFinderPartner, setOpenFinderPartner] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useState("");
  const [filter, setFilter] = useState({
    criteria_key: "",
    criteria_value: "",
  });
  const [validate, setValidate] = useState({
    criteria_key: "",
    criteria_value: "",
  });

  const rowsPerPage = 10;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": session.locale,
      "Authorization": `Bearer ${session.token}`,
    },
  };    

  useEffect(() => {
    if (contract.id_partner !== "") {
      setPartner(contract.name_partner);
    }
  }, [contract.id_partner, contract.name_partner]);

  const fetchData = async () => {
    const url = `/api/partners/services?page=${page}&per_page=${rowsPerPage}`;
    if (params != "") {
      url = url + params;
    }
    setLoading(true);

    try {
      const { data } = await axios.get(url, config);

      setLoading(false);

      setTotal(data.result.total);
      setTotalPages(data.result.total_pages);
      setRecords(data.result.data);
    } catch (error) {
      console.log(error);

      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al consultar la API',
        showConfirmButton: true,
      });              
    }
  };  

  const onFind = (e) => {
    e.preventDefault();

    if (records.length === 0) {
      setValidate({
        ...validate,
        criteria_key: filter.criteria_key != "" ? "success" : "error",
        criteria_value: filter.criteria_value != "" ? "success" : "error",
      });

      if (
        validate.criteria_key === "success" &&
        validate.criteria_value === "success"
      ) {
        const condition =
          "&criteria_key=" +
          filter.criteria_key +
          "&criteria_value=" +
          filter.criteria_value;

        params = condition;

        setParams(params);

        fetchData();
      }
    } else {
      setParams("");
      setFilter({
        criteria_key: "",
        criteria_value: "",
      });
      setValidate({
        criteria_key: "",
        criteria_value: "",
      });
      setRecord(null);
      setRecords([]);
    }
  };

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
    fetchData();
  };

  const onOpenFinder = () => {
    setOpenFinderPartner(true);
  };

  const onCloseFinder = () => {
    setParams("");
    setFilter({
      criteria_key: "",
      criteria_value: "",
    });
    setValidate({
      criteria_key: "",
      criteria_value: "",
    });
    setRecord(null);
    setRecords([]);

    setOpenFinderPartner(false);
  };

  const onAcceptFinder = () => {
    setPartner(record.name);

    changePartner(record);
    onCloseFinder();
  };

  const onItemCheck = (e, item) => {
    let tempList = records;
    tempList.map((row) => {
      if (row.id === item.id) {
        row.selected = e.target.checked;
      } else {
        row.selected = false;
      }
      return row;
    });

    setRecords(tempList);

    record = records.filter((e) => e.selected)[0];
    setRecord(record);
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
    <InputGroup size="sm">
      <Input
        id={id}
        type="text"
        name={id}
        placeholder="Cliente"
        value={partner}
        readOnly
      />
      <InputGroupText>
        <a
          style={{ cursor: "pointer" }}
          onClick={onOpenFinder}
          data-toggle="tooltip"
          title="Buscar cliente"
        >
          <i className="bi bi-search"></i>
        </a>
      </InputGroupText>
      <FormFeedback>Por favor seleccione el cliente</FormFeedback>

      <ModalForm id={"finderPartner"} open={openFinderPartner}>
        <ModalHeader toggle={onCloseFinder}>Buscar Clientes</ModalHeader>
        <ModalBody>
          <Row>
              <FormGroup row>
                <Label for="criteria_key" size="sm" sm={3}>
                  Buscar por:
                </Label>
                <Col sm={9}>
                  <InputGroup size="sm">
                    <Input
                      id="criteria_key"
                      name="criteria_key"
                      type="select"
                      valid={validate.criteria_key === "success"}
                      invalid={validate.criteria_key === "error"}
                      value={filter.criteria_key}
                      onChange={(e) => {
                        validForm(e);
                        handleChange(e);
                      }}
                    >
                      <option value="">Seleccione...</option>
                      <option value="type">Tipo</option>
                      <option value="name">Nombre</option>
                      <option value="dni">DNI | NIF</option>
                    </Input>
                    <FormFeedback>
                      Por favor, seleccione el críterio para buscar.
                    </FormFeedback>
                  </InputGroup>
                </Col>
              </FormGroup>
          </Row>
          <Row>
              <FormGroup row>
                <Label for="criteria_value" size="sm" sm={3}>
                {
                  filter.criteria_key === "type"
                    ? "Tipo"
                    : filter.criteria_key === "name"
                    ? "Nombre"
                    : filter.criteria_key === "dni" ? "DNI | NIF" : "Críterio"
                }
                </Label>
                <Col sm={9}>
                  <InputGroup size="sm">
                    <Input
                      type="text"
                      name="criteria_value"
                      id="criteria_value"
                      placeholder={
                        filter.criteria_key === "type"
                        ? "Tipo"
                        : filter.criteria_key === "name"
                        ? "Nombre"
                        : filter.criteria_key === "dni" ? "DNI | NIF" : "Críterio"
                      }
                      valid={validate.criteria_value === "success"}
                      invalid={validate.criteria_value === "error"}
                      value={filter.criteria_value}
                      onChange={(e) => {
                        validForm(e);
                        handleChange(e);
                      }}
                    />
                    <FormFeedback>
                      Por favor teclee el valor a buscar.
                    </FormFeedback>
                  </InputGroup>
                </Col>
              </FormGroup>
          </Row>
          <Row>
            <Col md={12}>
              { !loading &&
                <Button
                  color={records.length === 0 ? "danger" : "info"}
                  size="sm"
                  block
                  data-toggle="tooltip"
                  title={records.length === 0 ? "Buscar" : "Limpiar"}
                  onClick={(e) => onFind(e)}
                >
                  {records.length === 0 ? <i className="bi bi-search"></i> : <i className="bi bi-escape"></i>} {" "}
                  {records.length === 0 ? "Buscar" : "Limpiar"}
                </Button>
              }
              { loading && <div className="css-15dql7d"><HashLoader color="#36d7b7" size={"30px"} />Por favor, espere...</div>}
            </Col>
          </Row>

          {records.length > 0 && (
            <>
              <Row style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                <Col
                  style={{
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    display: "block",
                    background: "#e2e5ec",
                  }}
                >
                  <b>Clientes Encontrados</b>
                </Col>
              </Row>

              <Row>
                <DataTable
                  records={records}
                  columns={columns}
                  onItemCheck={onItemCheck}
                />
              </Row>

              <Row>
                <Pagination
                  onChangePage={onChangePage}
                  currentPage={page}
                  totalPage={totalPages}
                  totalCount={total}
                  rowsPerPage={rowsPerPage}
                  siblingCount={1}
                  showInfo={false}
                />
              </Row>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            onClick={onCloseFinder}
            color="secondary"
            data-toggle="tooltip"
            title="Cerrar"
          >
            <i className="bi bi-x-circle"></i> Cerrar
          </Button>
          <Button
            type="button"
            color="primary"
            disabled={record ? false : true}
            data-toggle="tooltip"
            onClick={onAcceptFinder}
            title="Aceptar"
          >
            <i className="bi bi-check2-circle"></i> Aceptar
          </Button>
        </ModalFooter>
      </ModalForm>
    </InputGroup>
  );
}
