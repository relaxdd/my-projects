import React, { ButtonHTMLAttributes, FC } from "react";
import css from "../../assets/scss/modules/Edit.module.scss";
import Loader from "../../components/ui/Loader";

interface EditSaveBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  isChanged: boolean;
  nameForm: string;
}

const EditSaveBtn: FC<EditSaveBtnProps> = ({ isLoading, isChanged, nameForm, ...props }) => {
  if (isLoading) {
    return (
      <button
        className={`btn btn-primary ${css.editSaveBtn}`}
        form={nameForm}
        disabled
      >
        <Loader variant="light" size="20px" />
        Сохраняем...
      </button>
    );
  } else {
    return (
      <button
        className="btn btn-primary"
        form={nameForm}
        disabled={!isChanged || isLoading}
        {...props}
      >
        Сохранить
      </button>
    );
  }
};

export default EditSaveBtn;
