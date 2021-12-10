import React, { ChangeEvent, useContext } from "react";
import { AuthContext } from "../../Contexts";
import FormErrors from "./FormErrors";
import LabelControl from "../ui/LabelControl";
// react-bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const LoginForm = () => {
  const { error, logForm, setLogForm, handleClose, onSubmitHandler } =
    useContext(AuthContext);

  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form id="login-form" onSubmit={(e) => onSubmitHandler(e)}>
          <LabelControl
            label="Username"
            id="user-name"
            type="text"
            placeholder="Введите свой username"
            value={logForm.username}
            required
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setLogForm({ ...logForm, username: e.target.value })
            }
          />
          <LabelControl
            label="Password"
            id="user-password"
            type="password"
            placeholder="Введите ваш пароль"
            value={logForm.password}
            required
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setLogForm({ ...logForm, password: e.target.value })
            }
          />
          <FormErrors error={error} />
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" form="login-form" variant="primary">
          Try
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
};

export default LoginForm;
