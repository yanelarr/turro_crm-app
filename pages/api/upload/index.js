import { IncomingForm } from "formidable";
import { promises as fs } from "fs";

var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function Upload(req, res) {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);

      const oldPath = files.file.filepath;
      const file = files.file.originalFilename;
      const ext = file.substr(file.lastIndexOf(".") + 1 - file.length);
      const fileName = fields.id + "." + ext;

      const newPath = `./public/profile/${fileName}`;
      mv(oldPath, newPath, function (err) {});
      res.status(200).json({ fields, files });
    });
  });
}
