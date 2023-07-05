import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "accept-Language": "es-ES,es;"
  }
}

const getContacts = async (req, res) => {
  const { page, per_page, criteria_key, criteria_value, partner_id } =
    req.query;
  let url = `${process.env.API_URL}contacts?page=${page}&per_page=${per_page}`;

  if (partner_id) {
    url = `${process.env.API_URL}contacts/partner/${partner_id}?page=1&per_page=6' contacts?page=${page}&per_page=${per_page}`;
  } else {
    if (criteria_key && criteria_value) {
      url =
        url + `&criteria_key=${criteria_key}&criteria_value=${criteria_value}`;
    }
  }

  try {
    const response = await axios.get(url, config);
    if (response.status == 200) {
      return res.status(200).json({
        result: response.data,
      });
    }
  } catch (errors) {
    console.log(errors);
    return res.status(errors.response.status).json({ error: errors.response.statusText });
  }
};

const createContact = async (req, res) => {
  const contact = req.body;
  const url = `${process.env.API_URL}contacts`;
  try {
    const response = await axios.post(url, contact, config);
    if (response.status == 200) {
      return res.status(200).json({
        message: response.statusText,
      });
    }
  } catch (errors) {
    return res
      .status(errors.response.status)
      .json({ error: errors.response.statusText });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.query;
  const contact = req.body;
  const url = `${process.env.API_URL}contacts/${id}`;
  try {
    const response = await axios.put(url, contact, config);
    if (response.status == 200) {
      return res.status(200).json({
        message: response.statusText,
      });
    }
  } catch (errors) {
    return res
      .status(errors.response.status)
      .json({ error: errors.response.statusText });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.query;
  const url = `${process.env.API_URL}contacts/${id}`;
  try {
    const response = await axios.delete(url, config);
    if (response.status == 200) {
      return res.status(200).json({
        message: response.statusText,
      });
    }
  } catch (errors) {
    return res
      .status(errors.response.status)
      .json({ error: errors.response.statusText });
  }
};

export default async function contactmgr(req, res) {
  if (req.headers["authorization"]) {
    config.headers["Authorization"] = req.headers["authorization"];

    if (req.headers["accept-language"]) {
      config.headers["accept-language"] = req.headers["accept-language"];
    }

    switch (req.method) {
      case "GET":
        // Nuestra lógica de código para el método GET...
        return getContacts(req, res);
        break;
      case "POST":
        // Nuestra lógica de código para el método POST...
        return createContact(req, res);
        break;
      case "PUT":
        // Nuestra lógica de código para el método PUT...
        return updateContact(req, res);
        break;
      case "DELETE":
        // Nuestra lógica de código para el método DELETE...
        return deleteContact(req, res);
        break;
      default:
        res.status(405).json({
          mensaje: `El método HTTP ${req.method} no esta disponible en esta ruta`,
        });
        break;
    }
  } else {
    res.status(401).json({
      mensaje: "Esquema de Autentificación erróneo",
    });
  }
}
