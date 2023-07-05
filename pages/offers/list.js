import { useState, useContext, useEffect, useRef } from "react";
import Layout from "../../layouts/Layout";

import DataTable from "../../components/Core/DataTable";
import Pagination from "../../components/Core/Pagination";
import ModalForm from "../../components/Core/ModalForm";
import AddOfferForm from "../../components/Offer/AddOffer";
import EditOfferForm from "../../components/Offer/EditOffer";
import TableTool from "../../components/Core/TableTool";
import FindOfferForm from "../../components/Offer/FindOffer";
import LoadingForm from "../../components/Core/Loading";

import AppContext from "../../AppContext";
import { getSession } from "next-auth/react";

import axios from "axios";
import Swal from "sweetalert2";
import fs from "fs";

const columns = [
  { id: 1, title: "Code", accessor: "code" },
  { id: 2, title: "Nombre", accessor: "name" },
  { id: 3, title: "Descripción", accessor: "description" },
  { id: 4, title: "Precio Costo", accessor: "cost_price" },
  { id: 5, title: "Precio Venta", accessor: "sale_price" },
  { id: 6, title: "Creado por", accessor: "created_by" },
  { id: 7, title: "Modificado por", accessor: "updated_by" },
  { id: 8, title: "Fecha de Creación", accessor: "created_date" },
  { id: 9, title: "Fecha Modificación", accessor: "updated_date" }  
];

export default function List({ session, rowsPerPage }) {
  const value = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openFind, setOpenFind] = useState(false);
  const [findMode, setFindMode] = useState(false);

  const mounted = useRef(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": session.locale,
      "Authorization": `Bearer ${session.token}`,
    },
  };

  useEffect(() => {
    value.setLanguageSelected(session.locale);

    const fetchData = async () => {
      const url = `/api/offers/services?page=${page}&per_page=${rowsPerPage}`;
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

        setReload(false);
      } catch (error) {
        setLoading(false);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al consultar la API",
          showConfirmButton: true,
        });
      }
    };

    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      fetchData();
    } else {
      // do componentDidUpdate logic
      if (reload) {
        fetchData();
      }
    }
  });

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
    setReload(true);
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
    selectedList = records.filter((e) => e.selected);
    setSelectedList(selectedList);
  };

  const addOffer = async (offer) => {
    const url = "/api/offers/services";
    setLoading(true);
    try {
      const res = await axios.post(url, offer, config);
      if (res.status === 200) {
        setLoading(false);

        Swal.fire({
          icon: "success",
          title: "Operación Exitosa",
          text: "La Oferta se ha creado con éxito",
          showConfirmButton: true,
        });
        setReload(true);
        setOpenAdd(false);
      }
    } catch (errors) {
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al consultar la API",
        showConfirmButton: true,
      });
    }
  };

  const editOffer = async (offer) => {
    selectedList.map(async (row) => {
      setLoading(true);
      const url = `/api/offers/services?id=${row.id}`;
      try {
        await axios.put(url, offer, config);
        setLoading(false);
      } catch (errors) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al consultar la API",
          showConfirmButton: true,
        });
      }
      Swal.fire({
        icon: "success",
        title: "Operación Exitosa",
        text: "Cambios guardados con éxito",
        showConfirmButton: true,
      });
      setReload(true);
      setOpenEdit(false);
    });
  };

  const delOffer = async (e) => {
    e.preventDefault();

    if (selectedList.length > 0) {
      const row = selectedList[0];

      setLoading(true);

      const url = `/api/offers/services?id=${row.id}`;
      await axios
        .delete(url, config)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Operación Exitosa",
            text: "Oferta eliminado con éxito",
            showConfirmButton: true,
          });
          setLoading(false);
        })
        .catch((errors) => {
          setLoading(false);

          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error al consultar la API",
            showConfirmButton: true,
          });
        });

      setReload(true);
    }
  };

  const findOffer = (filter) => {
    setPage(1);
    let condition = "";
    if (filter.criteria_key != "" && filter.criteria_value != "") {
      condition =
        "&criteria_key=" +
        filter.criteria_key +
        "&criteria_value=" +
        filter.criteria_value;
    }
    setParams(condition);
    setFindMode(true);

    setOpenFind(!openFind);
    setReload(true);
  };

  const openAddOffer = (e) => {
    e.preventDefault;
    setOpenAdd(true);
  };

  const openEditOffer = (e) => {
    e.preventDefault;
    setOpenEdit(true);
  };

  const openFindOffer = (e) => {
    e.preventDefault;
    setOpenFind(true);
  };

  const openDelOffer = (e) => {
    e.preventDefault;

    Swal.fire({
      title: "¿ Estás seguro ?",
      text: "! Esta opción no podrá ser revertida !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        delOffer(e);
      }
    });
  };

  const closeAddOffer = () => {
    setOpenAdd(false);
  };

  const closeEditOffer = () => {
    setOpenEdit(false);
  };

  const closeDelOffer = () => {
    setOpenDelete(false);
  };

  const closeFindOffer = () => {
    setParams("");
    setOpenFind(false);
    setFindMode(false);
    setReload(true);
  };

  return (
    <Layout user={session} title={"Ofertas"}>
      <div className="row">
        <div className="container">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <TableTool
                  title={"Ofertas"}
                  openForm={openAddOffer}
                  openFind={openFindOffer}
                  closFind={closeFindOffer}
                  isFindMode={findMode}
                  loading={loading}
                />
              </div>
              <DataTable
                tableId={"products"}
                records={records}
                columns={columns}
                onItemCheck={onItemCheck}
                onEdit={openEditOffer}
                onDelete={openDelOffer}
              />

              <Pagination
                onChangePage={onChangePage}
                currentPage={page}
                totalPage={totalPages}
                totalCount={total}
                rowsPerPage={rowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>

      <ModalForm id={"addOfferForm"} open={openAdd}>
        <AddOfferForm session={session} onAdd={addOffer} onClose={closeAddOffer} />
      </ModalForm>

      <ModalForm id={"editOfferForm"} open={openEdit}>
        <EditOfferForm
          session={session}
          record={selectedList}
          onEdit={openEditOffer}
          onClose={closeEditOffer}
        />
      </ModalForm>

      <ModalForm id={"findOfferForm"} open={openFind}>
        <FindOfferForm
          onFind={findOffer}
          isFindMode={findMode}
          onClose={closeFindOffer}
        />
      </ModalForm>

      <LoadingForm
        id={"loading"}
        open={loading}
        size="sm"
        waitMsg={"Por favor, espere"}
      />
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        destination: "/users/login",
        permanent: false,
      },
    };

  const userImage = `./public/profile/${session.id}.jpg`;
  const fileExists = fs.existsSync(userImage);
  if (fileExists) {
    session["avatar"] = `/profile/${session.id}.jpg`;
  } else {
    session["avatar"] = "/profile/empty.jpg";
  }

  return {
    props: {
      session,
      rowsPerPage: process.env.ROW_PER_PAGE,
    },
  };
};
