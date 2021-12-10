import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { hideNoticeMessage } from "../../store/reducers/UserSlice";
import css from "./Notices.module.scss";

const Notices = () => {
  const dispatch = useAppDispatch();
  const { noticeVisible, noticeMessage } = useAppSelector(
    (store) => store.UserReducer
  );
  if (!noticeVisible) return null;

  const closeNotice = () => {
    dispatch(hideNoticeMessage());
  };

  return (
    <div className={css.noticeWrapper}>
      <p className={css.noticeText}>{noticeMessage}</p>
      <span
        className={"material-icons " + css.noticeClose}
        onClick={closeNotice}
      >
        close
      </span>
    </div>
  );
};

export default Notices;
