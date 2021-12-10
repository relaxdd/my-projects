import React, { ChangeEvent, useContext } from "react";
import { AuthContext } from "../../Contexts";
import FormErrors from "./FormErrors";
import LabelControl from "../ui/LabelControl";
// react-bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const RegisterForm = () => {
  const { error, regForm, setRegForm, handleClose, onSubmitHandler } =
    useContext(AuthContext);

  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          id="register-form"
          autoComplete="new-data"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <LabelControl
            label="Username"
            id="user-name"
            type="text"
            placeholder="Придумайте username"
            value={regForm.username}
            required
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setRegForm({ ...regForm, username: e.target.value })
            }
          />
          <LabelControl
            label="Email"
            id="user-email"
            type="email"
            placeholder="ivan@example.org"
            value={regForm.email}
            required
            onInput={(e: ChangeEvent<HTMLInputElement>) => setRegForm({ ...regForm, email: e.target.value })}
          />
          <LabelControl
            label="Password"
            id="user-password"
            type="password"
            placeholder="Придумайте пароль"
            value={regForm.password}
            required
            autoComplete="new-password"
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setRegForm({ ...regForm, password: e.target.value })
            }
          />
          <LabelControl
            label="Password confirm"
            id="passford-confirm"
            type="password"
            placeholder="Повторите ваш пароль"
            value={regForm.confirm}
            required
            autoComplete="new-password"
            onInput={(e: ChangeEvent<HTMLInputElement>) => setRegForm({ ...regForm, confirm: e.target.value })}
          />
          <FormErrors error={error} />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" form="register-form" variant="primary">
          Try
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
};

export default RegisterForm;
