import { unwrapResult } from "@reduxjs/toolkit";
import React, { FormEvent } from "react";
import css from "../../assets/scss/modules/AuthWidget.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useInput from "../../hooks/useInput";
import { loginUser } from "../../store/reducers/UserSlice";
import LabelControl from "../ui/LabelControl";
import Loader from "../ui/Loader";

const AuthWidget = () => {
  // redux store
  const dispatch = useAppDispatch();
  const { errorMessage, isUserLoading } = useAppSelector(
    (store) => store.UserReducer
  );
  // hooks
  const [username] = useInput("");
  const [password] = useInput("");

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const logForm = {
      username: username.value,
      password: password.value,
    };

    dispatch(loginUser(logForm))
      .then(unwrapResult)
      .catch(() => console.error(errorMessage));
  };

  return (
    <div className={css.authWidgetWrap}>
      <div className={css.authWidgetContent}>
        <form
          onSubmit={submitHandler}
          style={{ opacity: isUserLoading ? ".7" : "1" }}
        >
          <div className="mb-3">
            <LabelControl
              label="username"
              id="username"
              valueCreators={username}
            />
          </div>
          <div className="mb-3">
            <LabelControl
              type="password"
              label="password"
              id="password"
              valueCreators={password}
            />
          </div>
          <div>
            {!isUserLoading ? (
              <button type="submit" className="btn btn-primary w-100">
                Войти
              </button>
            ) : (
              <button
                type="submit"
                disabled
                className="btn btn-primary w-100"
                style={{ display: "flex", alignItems: "center", gap: "0 7px" }}
              >
                <span>Загрузка...</span>

                <Loader variant="light" size="20px" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthWidget;
