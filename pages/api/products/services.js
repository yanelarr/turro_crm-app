import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "accept-Language": "es-ES,es;"
  }
}

const getProducts = async (req, res) => {
  const { page, per_page, criteria_key, criteria_value } = req.query;
  let url = `${process.env.API_URL}stock/product/product?page=${page}&per_page=${per_page}`;
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

const createProduct = async (req, res) => {
  const product = req.body;
  const url = `${process.env.API_URL}stock/product`;

  try {
    const response = await axios.post(url, product, config);
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

const updateProduct = async (req, res) => {
  const { id } = req.query;
  const product = req.body;
  const url = `${process.env.API_URL}stock/product/${id}`;

  try {
    const response = await axios.put(url, product, config);
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

const deleteProduct = async (req, res) => {
  const { id } = req.query;
  const url = `${process.env.API_URL}stock/product/${id}`;
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

export default async function productmgr(req, res) {
  if (req.headers["authorization"]) {
    config.headers["Authorization"] = req.headers["authorization"];

    if (req.headers["accept-language"]) {
      config.headers["accept-language"] = req.headers["accept-language"];
    }

    switch (req.method) {
      case "GET":
        // Nuestra lógica de código para el método GET...
        return getProducts(req, res);
        break;
      case "POST":
        // Nuestra lógica de código para el método POST...
        return createProduct(req, res);
        break;
      case "PUT":
        // Nuestra lógica de código para el método PUT...
        return updateProduct(req, res);
        break;
      case "DELETE":
        // Nuestra lógica de código para el método DELETE...
        return deleteProduct(req, res);
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
