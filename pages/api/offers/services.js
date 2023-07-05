import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "accept-Language": "es-ES,es;"
  }
}

const getOffers = async (req, res) => {
  const { page, per_page, criteria_key, criteria_value } = req.query;
  let url = `${process.env.API_URL}offers?page=${page}&per_page=${per_page}`;
  if (criteria_key && criteria_value) {
    url =
      url + `&criteria_key=${criteria_key}&criteria_value=${criteria_value}`;
  }
  try {
    const response = await axios.get(url, config);
    if (response.status == 200) {
      return res.status(200).json({
        result: response.data,
      });
    }
  } catch (errors) {
    return res
      .status(errors.response.status)
      .json({ error: errors.response.statusText });
  }
};

const createOffer = async (req, res) => {
  const offer = req.body;
  const url = `${process.env.API_URL}offer`;

  try {
    const response = await axios.post(url, offer, config);
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

const updateOffer = async (req, res) => {
  const { id } = req.query;
  const offer = req.body;
  const url = `${process.env.API_URL}offer/${id}`;

  try {
    const response = await axios.put(url, offer, config);
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

const deleteOffer = async (req, res) => {
  const { id } = req.query;
  const url = `${process.env.API_URL}offer/${id}`;
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

export default async function offermgr(req, res) {
  if (req.headers["authorization"]) {
    config.headers["Authorization"] = req.headers["authorization"];

    if (req.headers["accept-language"]) {
      config.headers["accept-language"] = req.headers["accept-language"];
    }

    switch (req.method) {
      case "GET":
        // Nuestra lógica de código para el método GET...
        return getOffers(req, res);
        break;
      case "POST":
        // Nuestra lógica de código para el método POST...
        return createOffer(req, res);
        break;
      case "PUT":
        // Nuestra lógica de código para el método PUT...
        return updateOffer(req, res);
        break;
      case "DELETE":
        // Nuestra lógica de código para el método DELETE...
        return deleteOffer(req, res);
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
