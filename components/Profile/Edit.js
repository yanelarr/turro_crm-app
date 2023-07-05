import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import {
  Form,
  Row,
  FormGroup,
  Label,
  Col,
  InputGroup,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";

import Swal from "sweetalert2";

export default function EditProfile({ profile, setProfile }) {
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  useEffect(() => {
    setCreateObjectURL(profile.photo);
  }, [profile.photo]);

  const uploadImage = async (event) => {
    event.preventDefault();

    const body = new FormData();
    body.append("id", profile.id);
    body.append("file", image);

    const response = await axios.post("/api/upload", body);

    if (response.status == 200) {
      setUploading(false);

      setProfile({
        ...profile,
        photo: `/profile/${profile.id}.jpg`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error, su imagen no ha subido al servidor.",
        showConfirmButton: true,
      });
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    setUploading(true);

    const url = `/api/profile/services?id=${profile.id}`;

    try {
      const response = await axios.put(url, profile);

      if (response.status == 200) {
        uploadImage(event);

        Swal.fire({
          icon: "success",
          title: "Operación Exitosa",
          text: "El perfil se ha actualizado con éxito.",
          showConfirmButton: true,
        });
      }
    } catch (errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al consultar la API",
        showConfirmButton: true,
      });
    }
  };

  const handleChange = (event) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  return (
    <div className="profile-edit pt-3" id="profile-edit">
      <Form onSubmit={handleUpload} encType="multipart/form-data">
        <Row>
          <FormGroup row>
            <Label size="sm" sm={3}>
              Foto del Pérfil
            </Label>
            <Col sm={9}>
              { profile.photo &&
              <Image
                src={createObjectURL ? createObjectURL : profile.photo}
                alt="Perfil"
                width="100%"
                height="100%"
              />}
              <div style={{ paddingLeft: "15px" }}>
                <Label
                  href="#"
                  className="btn btn-primary btn-sm"
                  title="Cargar nueva foto de pérfil"
                  style={{ color: "white" }}
                >
                  <i className="bi bi-upload"></i>
                  <Input
                    type="file"
                    hidden
                    onChange={(event) => {
                      if (event.target.files && event.target.files[0]) {
                        const i = event.target.files[0];
                        if (i.type.includes("image/jpeg") && i.size <= 6000) {
                          setImage(i);
                          setCreateObjectURL(URL.createObjectURL(i));
                        } else {
                          Swal.fire({
                            icon: "error",
                            title: "Cargando Imagen",
                            text: "Ha ocurrido un error al cargar la imagen, debe ser un jpg menor de 6 kb",
                            showConfirmButton: true,
                          });
                        }
                      }
                    }}
                  />
                </Label>

                <Label
                  href="#"
                  className="btn btn-danger btn-sm"
                  title="Eliminar mí foto de perfil"
                  style={{ color: "white" }}
                  onClick={(e) => {
                    setImage(null);
                    setCreateObjectURL(null);
                    setProfile({
                      ...profile,
                      photo: "/profile/empty.png",
                    });
                    setUploading(false);
                  }}
                >
                  <i className="bi bi-trash"></i>
                </Label>
              </div>
            </Col>
          </FormGroup>
        </Row>

        <Row>
          <FormGroup row>
            <Label for="fullName" size="sm" sm={3}>
              Nombre
            </Label>
            <Col sm={9}>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Nombre Completo"
                  value={profile.fullname}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onKeyPress={(event) => {
                    if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>Teclee su nombre completo.</FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
        </Row>

        <Row>
          <FormGroup row>
            <Label for="dni" size="sm" sm={3}>
              DNI
            </Label>
            <Col sm={9}>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="dni"
                  id="dni"
                  placeholder="DNI"
                  value={profile.dni}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <FormFeedback>Teclee su DNI.</FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
        </Row>

        <Row>
          <FormGroup row>
            <Label for="job" size="sm" sm={3}>
              Cargo
            </Label>
            <Col sm={9}>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="job"
                  id="job"
                  placeholder="Cargo"
                  value={profile.job}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <FormFeedback>
                  Teclee su cargo dentro de la empresa.
                </FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
        </Row>

        <Row>
          <FormGroup row>
            <Label for="phone" size="sm" sm={3}>
              Teléfono
            </Label>
            <Col sm={9}>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Teléfono"
                  value={profile.phone}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <FormFeedback>Teclee su teléfono.</FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
        </Row>

        <Row>
          <FormGroup row>
            <Label for="email" size="sm" sm={3}>
              Correo
            </Label>
            <Col sm={9}>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Correo"
                  value={profile.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <FormFeedback>Teclee su correo.</FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
        </Row>

        <div className="text-center">
          <Button
            type="submit"
            color="primary"
            data-toggle="tooltip"
            title="Guardar Cambios"
          >
            <i className="bi bi-check2-circle"></i> Guardar Cambios
          </Button>
        </div>
      </Form>
    </div>
  );
}
