import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import AppContext from "../../AppContext";
import Swal from "sweetalert2";
import {
  Col,
  Label,
  Form,
  FormGroup,
  InputGroup,
  Input,
  FormFeedback,
  Button,
  InputGroupText,
} from "reactstrap";
import Password from "../Core/Password";

export default function LoginForm() {
  const router = useRouter();
  const value = useContext(AppContext);
  const t = value.state.languages.auth;

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [validate, setValidate] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { languageSelected } = value.state;

    setValidate({
      ...validate,
      username: credentials.username != "" ? "success" : "error",
      password: credentials.password != "" ? "success" : "error",
    });

    if (validate.username === "success" && validate.password === "success") {
      const res = await signIn("credentials", {
        redirect: false,
        locale: languageSelected,
        username: credentials.username,
        password: credentials.password,
      });

      if (res?.error) {

        Swal.fire({
          icon: "error",
          title: t.logIn,
          text: t.logInFail,
          showConfirmButton: true,
        });
      } else {
        router.push("/");
      }
    }
  };

  const validForm = (event) => {
    const { target } = event;
    const value = target.value;
    const { name } = target;

    setValidate({
      ...validate,
      [name]: value != "" ? "success" : "error",
    });
  };

  const handleChange = (event) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <Col md={12}>
        <FormGroup>
          <Label>{t.userLabel}</Label>
          <InputGroup size="sm">
            <InputGroupText>
              <i className="bi bi-person-fill"></i>
            </InputGroupText>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder={t.userLabel}
              // valid={validate.username === "success"}
              invalid={validate.username === "error"}
              value={credentials.username}
              onChange={(e) => {
                validForm(e);
                handleChange(e);
              }}
              onKeyPress={(event) => {
                if (!/^[a-z_.\s]*$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <FormFeedback>{t.userFeed}</FormFeedback>
          </InputGroup>
        </FormGroup>
      </Col>
      <Col md={12}>
        <FormGroup>
          <Label>{t.passwordLabel}</Label>
          <Password
            placeHolder={t.passwordLabel}
            feedBack={t.passwordFeed}
            credentials={credentials}
            validate={validate}
            validForm={validForm}
            handleChange={handleChange}
          />
        </FormGroup>
      </Col>
      <Col md={12}></Col>
      <Col md={12} style={{ textAlign: "end" }}>
        <Button type="submit" color="primary">
          <i className="bi bi-check2-circle"></i> {t.logIn}
        </Button>
      </Col>
    </Form>
  );
}
