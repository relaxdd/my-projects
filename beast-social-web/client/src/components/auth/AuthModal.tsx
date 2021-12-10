import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
// bootstrap-react/Components
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../Contexts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { loginUser, registerUser } from "../../store/reducers/UserSlice";
import Loader from "../ui/Loader";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const defLogForm = {
  username: "",
  password: "",
};

const defRegForm = {
  username: "",
  email: "",
  password: "",
  confirm: "",
};

const AuthModal = () => {
  // redux-toolkit
  const dispatch = useAppDispatch();
  const { isUserLoading, errorMessage, isAuth } = useAppSelector(
    (store) => store.UserReducer
  );
  // State
  const [isLogin, setIsLogin] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [logForm, setLogForm] = useState(defLogForm);
  const [regForm, setRegForm] = useState(defRegForm);

  const handleClose = () => setModalShow(false);

  useEffect(() => {
    setLogForm(defLogForm);
    setRegForm(defRegForm);
    // eslint-disable-next-line
  }, [isLogin]);

  const onSubmitHandler = (e: SubmitEvent) => {
    e.preventDefault();

    if (isLogin) {
      dispatch(loginUser(logForm))
        .then(unwrapResult)
        .then(() => handleClose())
        .catch(() => console.error(errorMessage));
    } else {
      dispatch(registerUser(regForm))
        .then(unwrapResult)
        .then(() => handleClose())
        .catch(() => console.error(errorMessage));
    }
  };

  if (isAuth) return null;

  return (
    <React.Fragment>
      <Button
        variant="outline-light"
        className="me-2"
        onClick={() => {
          setIsLogin(true);
          setModalShow(true);
        }}
      >
        Log in
      </Button>
      <Button
        variant="warning"
        onClick={() => {
          setIsLogin(false);
          setModalShow(true);
        }}
      >
        Sign up
      </Button>
      <AuthContext.Provider
        value={{
          error: errorMessage,
          logForm,
          regForm,
          handleClose,
          onSubmitHandler,
          setLogForm,
          setRegForm,
        }}
      >
        <Modal
          show={modalShow}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className={
            isUserLoading ? "auth_modal auth_modal__loading" : "auth_modal"
          }
        >
          {isUserLoading && (
            <div className="modal-loading__wrapper">
              <Loader />
            </div>
          )}

          {isLogin ? <LoginForm /> : <RegisterForm />}
        </Modal>
      </AuthContext.Provider>
    </React.Fragment>
  );
};

export default AuthModal;
