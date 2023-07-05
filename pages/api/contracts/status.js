import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "accept-Language": "es-ES,es;"
  }
}

export default async function status(req, res) {
  if (req.headers["authorization"]) {
    config.headers["Authorization"] = req.headers["authorization"];

    if (req.headers["accept-language"]) {
      config.headers["accept-language"] = req.headers["accept-language"];
    }

    let url = `${process.env.API_URL}resources/status/contract/`;

    try {
      const response = await axios.get(url, config);
      if (response.status == 200) {
        return res.status(200).json({
          result: response.data,
        });
      }
    } catch (errors) {
      console.log(errors);
      return res
        .status(errors.response.status)
        .json({ error: errors.response.statusText });
    }
  } else {
    res.status(401).json({
      mensaje: "Esquema de Autentificación erróneo",
    });
  }
}
