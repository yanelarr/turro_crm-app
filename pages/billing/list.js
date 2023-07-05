import { useState, useContext, useEffect, useRef } from "react";
import AppContext from "../../AppContext";
import { getSession } from "next-auth/react";
import Layout from "../../layouts/Layout";

import DataTable from "../../components/Core/DataTable";
import Pagination from "../../components/Core/Pagination";
import ModalForm from "../../components/Core/ModalForm";
import TableTool from "../../components/Core/TableTool";
import fs from "fs";
import { numFormat } from "../../data";


export default function List({ session, rowsPerPage }) {
    const value = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [reload, setReload] = useState(false);
    const [selectedList, setSelectedList] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    return (
      <h1>Billing {numFormat(130.45)}</h1>
    )  
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
  