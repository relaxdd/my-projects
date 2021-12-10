import LabelControl from "../../components/ui/LabelControl";
import useInput from "../../hooks/useInput";
import css from "../../assets/scss/modules/Edit.module.scss";
import { useAppSelector } from "../../hooks/redux";
import { FormEvent, useEffect, useState } from "react";
import { IUserDto } from "../../types/IUser";
import EditSaveBtn from "./EditSaveBtn";
import $api from "../../http";

interface changeContactsProps {
  email: string;
}

interface changePasswordProps {
  password: string;
  newPassword: string;
  newPasswordConform: string;
}

const EditAccess = () => {
  const user = useAppSelector((store) => store.UserReducer.user) as IUserDto;
  // value
  const [username] = useInput(user.username);
  const [email] = useInput(user.email);
  const [password] = useInput("");
  const [newPassword] = useInput("");
  const [newPasswordConform] = useInput("");
  // state
  const [isChangedContacts, setChangedContacts] = useState<boolean>(false);
  const [visibleContacts, setVisibleContacts] = useState<boolean>(true);
  // --------------
  const [isChangedPassword, setChangedPassword] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  // loading
  const [isLoading, setLoading] = useState<boolean>(false);

  const fieldsFormContacts = [email.value];

  const fieldsFormPassword = [
    email.value,
    password.value,
    newPassword.value,
    newPasswordConform.value,
  ];

  useEffect(() => {
    if (!user) return;

    const current = { email: email.value };
    const source = { email: user.email };

    setChangedContacts(JSON.stringify(current) !== JSON.stringify(source));
    // eslint-disable-next-line
  }, [...fieldsFormContacts, user]);

  const submitHandlerContact = async (e: FormEvent) => {
    e.preventDefault();

    const formValues: changeContactsProps = {
      email: email.value,
    };

    const updateData = {
      userId: user.id,
      formValues,
    };

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (!user) return;

    const current = {
      password: password.value,
      newPassword: newPassword.value,
      newPasswordConform: newPasswordConform.value,
    };

    const source = {
      password: "",
      newPassword: "",
      newPasswordConform: "",
    };

    setChangedPassword(JSON.stringify(current) !== JSON.stringify(source));
    // eslint-disable-next-line
  }, [...fieldsFormPassword, user]);

  const submitHandlerPassword = async (e: FormEvent) => {
    e.preventDefault();

    const formValues: changePasswordProps = {
      password: password.value,
      newPassword: newPassword.value,
      newPasswordConform: newPasswordConform.value,
    };

    const updateData = {
      userId: user.id,
      formValues,
    };

    setLoading(true);

    $api
      .post("/auth/change/password", updateData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className={css.editWrapper}>
        <div
          className={`${css.editWrapperHeader} ${css.editWrapperHeaderMore}`}
          onClick={() => setVisibleContacts((prev) => !prev)}
        >
          <span>Контакты</span>
          <span className={`material-icons ${css.togglerVisibleSection}`}>
            {!visibleContacts ? "expand_more" : "expand_less"}
          </span>
        </div>
        <div style={{ display: !visibleContacts ? "none" : "block" }}>
          <div className={css.editWrapperContent}>
            <form id="edit-contacts" onSubmit={submitHandlerContact}>
              <LabelControl
                label="Имя пользователя"
                id="current-username"
                autoComplete="new-data"
                readOnly
                valueCreators={{ value: username.value }}
              />
              <LabelControl
                label="Email"
                id="user-email"
                type="email"
                small="Что бы поменять email мы вышлем вам код подтверждения на старую почту"
                valueCreators={email}
              />
            </form>
          </div>
          <div className={css.editWrapperFooter}>
            <EditSaveBtn
              isLoading={isLoading}
              isChanged={isChangedContacts}
              nameForm="edit-contacts"
            />
          </div>
        </div>
      </div>

      <div className={css.editWrapper}>
        <div
          className={`${css.editWrapperHeader} ${css.editWrapperHeaderMore}`}
          onClick={() => setVisiblePassword((prev) => !prev)}
        >
          <span>Смена пароля</span>
          <span className={`material-icons ${css.togglerVisibleSection}`}>
            {!visiblePassword ? "expand_more" : "expand_less"}
          </span>
        </div>
        <div style={{ display: !visiblePassword ? "none" : "block" }}>
          <div className={css.editWrapperContent}>
            <form id="edit-password" onSubmit={submitHandlerPassword}>
              <LabelControl
                label="Текущий пароль"
                id="user-password"
                type="password"
                valueCreators={password}
              />
              <LabelControl
                label="Новый пароль"
                id="new-password"
                type="password"
                autoComplete="new-password"
                valueCreators={newPassword}
              />
              <LabelControl
                label="Подтверждение нового пароля"
                id="new-password-confirm"
                type="password"
                autoComplete="new-password"
                valueCreators={newPasswordConform}
              />
            </form>
          </div>
          <div className={css.editWrapperFooter}>
            <EditSaveBtn
              isLoading={isLoading}
              isChanged={isChangedPassword}
              nameForm="edit-password"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAccess;
