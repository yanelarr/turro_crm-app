import { useState } from "react";
import { Input, InputGroup, InputGroupText, FormFeedback } from "reactstrap";

function Password({
  placeHolder,
  feedBack,
  credentials,
  validate,
  validForm,
  handleChange,
}) {
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <InputGroup size="sm">
      <InputGroupText>
        <i className="bi bi-key-fill"></i>
      </InputGroupText>
      <Input
        type={passwordType}
        name="password"
        placeholder={placeHolder}
        // valid={validate.password === "success"}
        invalid={validate.password === "error"}
        value={credentials.password}
        onChange={(e) => {
          validForm(e);
          handleChange(e);
        }}
      />
      <InputGroupText>
        <a onClick={togglePassword}>
          {passwordType === "password" ? (
            <i className="bi bi-eye-slash"></i>
          ) : (
            <i className="bi bi-eye"></i>
          )}
        </a>
      </InputGroupText>

      <FormFeedback>{feedBack}</FormFeedback>
    </InputGroup>
  );
}
export default Password;
