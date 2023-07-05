import { useState, useEffect, useRef } from "react";
import { InputGroup, Input, FormFeedback } from "reactstrap";
import axios from "axios";
import Swal from 'sweetalert2'

export default function SignUser({ session, id, handleChange, validForm, valDefault }) {
  const mounted = useRef(false);
  const [records, setRecords] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": session.locale,
      "Authorization": `Bearer ${session.token}`,
    },
  };  

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/users/signuser`;
      // setLoading(true);
      try {
        const { data } = await axios.get(url, config);
        // setLoading(false);
        setRecords(data.result.data);
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

  return (
    <InputGroup size="sm">
      <Input
        id={id}
        name={id}
        type="select"
        value={valDefault}
        onChange={(e) => {
          validForm(e);
          handleChange(e);
        }}
      >
        <option value="">Seleccione...</option>
        {records.map((record, i) => {
          return (
            <option key={i} value={record.id}>
              {record.fullname}
            </option>
          );
        })}
      </Input>
      <FormFeedback>
        Por favor, seleccione quién firmo el contrato.
      </FormFeedback>
    </InputGroup>
  );
}
