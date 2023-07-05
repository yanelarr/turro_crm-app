import { useState, useContext, useEffect, useRef } from "react";
import Layout from "../../layouts/Layout";

import DataTable from "../../components/Core/DataTable";
import Pagination from "../../components/Core/Pagination";
import ModalForm from "../../components/Core/ModalForm";
import AddProductForm from "../../components/Product/AddProduct";
import EditProductForm from "../../components/Product/EditProduct";
import TableTool from "../../components/Core/TableTool";
import FindProductForm from "../../components/Product/FindProduct";
import LoadingForm from "../../components/Core/Loading";

import AppContext from "../../AppContext";
import { getSession } from "next-auth/react";

import axios from "axios";
import Swal from "sweetalert2";
import fs from "fs";

const columns = [
  { id: 1, title: "Fecha de Creación", accessor: "created_date" },
  { id: 2, title: "Creado por", accessor: "created_date" },
  { id: 3, title: "Fecha Modificación", accessor: "updated_date" },
  { id: 4, title: "Modificado por", accessor: "updated_by" },
  { id: 5, title: "Code", accessor: "code" },
  { id: 6, title: "Nombre", accessor: "name" },
  { id: 7, title: "Descripción", accessor: "description" },
  { id: 8, title: "Unidad M.", accessor: "measure" },
  { id: 9, title: "Precio Unitario", accessor: "unit_price" },
  { id: 10, title: "Precio Costo", accessor: "cost_price" },
  { id: 11, title: "Precio Venta", accessor: "unit_venta" }
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
      const url = `/api/products/services?page=${page}&per_page=${rowsPerPage}`;
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

  const addProduct = async (product) => {
    const url = "/api/products/services";
    setLoading(true);
    try {
      const res = await axios.post(url, product, config);
      if (res.status === 200) {
        setLoading(false);

        Swal.fire({
          icon: "success",
          title: "Operación Exitosa",
          text: "El producto se ha creado con éxito",
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

  const editProduct = async (product) => {
    selectedList.map(async (row) => {
      setLoading(true);
      const url = `/api/products/services?id=${row.id}`;
      try {
        await axios.put(url, product, config);
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

  const delProduct = async (e) => {
    e.preventDefault();

    if (selectedList.length > 0) {
      const row = selectedList[0];

      setLoading(true);

      const url = `/api/partners/services?id=${row.id}`;
      await axios
        .delete(url, config)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Operación Exitosa",
            text: "Producto eliminado con éxito",
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

  const findProduct = (filter) => {
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

  const openAddProduct = (e) => {
    e.preventDefault;
    setOpenAdd(true);
  };

  const openEditProduct = (e) => {
    e.preventDefault;
    setOpenEdit(true);
  };

  const openFindProduct = (e) => {
    e.preventDefault;
    setOpenFind(true);
  };

  const openDelProduct = (e) => {
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
        delProduct(e);
      }
    });
  };

  const closeAddProduct = () => {
    setOpenAdd(false);
  };

  const closeEditProduct = () => {
    setOpenEdit(false);
  };

  const closeDelProduct = () => {
    setOpenDelete(false);
  };

  const closeFindProduct = () => {
    setParams("");
    setOpenFind(false);
    setFindMode(false);
    setReload(true);
  };

  return (
    <Layout user={session} title={"Productos"}>
      <div className="row">
        <div className="container">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <TableTool
                  title={"Productos"}
                  openForm={openAddProduct}
                  openFind={openFindProduct}
                  closFind={closeFindProduct}
                  isFindMode={findMode}
                  loading={loading}
                />
              </div>
              <DataTable
                tableId={"products"}
                records={records}
                columns={columns}
                onItemCheck={onItemCheck}
                onEdit={openEditProduct}
                onDelete={openDelProduct}
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

      <ModalForm id={"addProductForm"} open={openAdd}>
        <AddProductForm session={session} onAdd={addProduct} onClose={closeAddProduct} />
      </ModalForm>

      <ModalForm id={"editProductForm"} open={openEdit}>
        <EditProductForm
          session={session}
          record={selectedList}
          onEdit={editProduct}
          onClose={closeEditProduct}
        />
      </ModalForm>

      <ModalForm id={"findProductForm"} open={openFind}>
        <FindProductForm
          onFind={findProduct}
          isFindMode={findMode}
          onClose={closeFindProduct}
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
