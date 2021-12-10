import { unwrapResult } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { FC, FormEvent, useEffect, useState } from "react";
import css from "../../assets/scss/modules/Edit.module.scss";
import DateBirth from "../../components/edit/DateBirth";
import LabelControl from "../../components/ui/LabelControl";
import LabelSelect from "../../components/ui/LabelSelect";
import Loader from "../../components/ui/Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useInput from "../../hooks/useInput";
import useSelect from "../../hooks/useSelect";
import { ResError } from "../../services/UserService";
import {
  fetchUserInfoById,
  formValuesType,
  updateUserInfo
} from "../../store/reducers/UserInfoSlice";
import { IUserDto } from "../../types/IUser";
import IUserInfo from "../../types/IUserInfo";
import EditSaveBtn from "./EditSaveBtn";

interface genderOptopnsType {
  name: string;
  value: string;
}

const genderOptopns: genderOptopnsType[] = [
  { name: "Не выбран", value: "none" },
  { name: "Мужской", value: "male" },
  { name: "Женский", value: "female" },
];

const EditPrimary: FC = () => {
  // redux-toolkit
  const dispatch = useAppDispatch();
  const { isUserInfoLoading, userInfo } = useAppSelector(
    (state) => state.UserInfoReducer
  );
  const user = useAppSelector((store) => store.UserReducer.user) as IUserDto;
  // primary fields form
  const [firstname, setFirstName] = useInput("");
  const [lastname, setLastName] = useInput("");
  const [usercity, setUserCity] = useInput("");
  const [userphone, setUserPhone] = useInput("");
  const [gender, setGender] = useSelect("none");
  const [datebirth, setDatebirth] = useState<string | null>(null);
  // others
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isChanged, setChanged] = useState<boolean>(false);

  const fieldsForm = [
    firstname.value,
    lastname.value,
    usercity.value,
    userphone.value,
    datebirth,
  ];

  const createFormValues = (
    userinfo: IUserInfo | null = null
  ): formValuesType => {
    if (!userinfo) {
      return {
        firstName: firstname.value || null,
        lastName: lastname.value || null,
        dateBirth: datebirth,
        city: usercity.value || null,
        phone: userphone.value || null,
      };
    } else {
      return {
        firstName: userinfo.firstName,
        lastName: userinfo.lastName,
        dateBirth: userinfo.dateBirth,
        city: userinfo.city,
        phone: userinfo.phone,
      };
    }
  };

  useEffect(() => {
    if (!userInfo) dispatch(fetchUserInfoById(user.id));
    else {
      setFirstName(userInfo?.firstName ?? "");
      setLastName(userInfo?.lastName ?? "");
      setUserCity(userInfo?.city ?? "");
      setUserPhone(userInfo?.phone ?? "");
      setGender(userInfo?.gender ?? "none");
      setDatebirth(userInfo?.dateBirth ?? null);
    }
    // eslint-disable-next-line
  }, [userInfo]);

  const changeDateBirth = (value: string) => setDatebirth(value);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const formValues = createFormValues();
    setLoading(true);

    const updateData = {
      userId: user.id,
      formValues,
    };

    dispatch(updateUserInfo(updateData))
      .then(unwrapResult)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        const err = e as AxiosError<ResError>;
        console.error(err.response?.data?.message ?? err.response?.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (userInfo) {
      const curFormValues = createFormValues();
      const srcFormValues = createFormValues(userInfo);

      setChanged(
        JSON.stringify(curFormValues) !== JSON.stringify(srcFormValues)
      );
    }
    // eslint-disable-next-line
  }, [...fieldsForm, userInfo]);

  if (isUserInfoLoading) {
    return (
      <div className="text-center my-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className={css.editWrapper} style={{ marginBottom: 20 }}>
      <div className={css.editWrapperHeader}>Основное</div>
      <div className={css.editWrapperContent}>
        <form id="edit-primary" onSubmit={submitHandler}>
          <LabelControl
            label="Имя"
            id="user-firstname"
            valueCreators={firstname}
          />
          <LabelControl
            label="Фамилия"
            id="user-lastname"
            valueCreators={lastname}
          />
          <LabelSelect
            label="Пол"
            id="user-gender"
            defaultValue="none"
            options={genderOptopns}
            disabled
            {...gender}
          />
          <DateBirth
            value={userInfo?.dateBirth ?? null}
            changeDateBirth={changeDateBirth}
          />
          <LabelControl label="Город" id="user-city" valueCreators={usercity} />
          <LabelControl
            label="Номер телефона"
            id="user-phone"
            type="tel"
            valueCreators={userphone}
          />
        </form>
      </div>
      <div className={css.editWrapperFooter}>
        <EditSaveBtn
          isLoading={isLoading}
          isChanged={isChanged}
          nameForm="edit-primary"
        />
      </div>
    </div>
  );
};

export default EditPrimary;
