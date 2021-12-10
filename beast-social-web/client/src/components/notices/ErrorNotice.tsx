import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeNotice } from "../../store/reducers/UserInfoSlice";
import css from "./Notices.module.scss";

const ErrorNotice = () => {
  const dispatch = useAppDispatch();
  const { errorNotification } = useAppSelector(
    (state) => state.UserInfoReducer
  );

  const closeErrorNotice = () => {
    dispatch(removeNotice());
  }

  return (
    <div
      className={`${css.errorNoticeWrapper} ${
        Boolean(errorNotification) && css.errorNoticeWrapper__show
      }`}
    >
      <div className={css.errorNoticeContent}>
        <span>{errorNotification}</span>
        <span className={css.errorNoticeClose} onClick={closeErrorNotice}>&times;</span>
      </div>
    </div>
  );
};

export default ErrorNotice;
