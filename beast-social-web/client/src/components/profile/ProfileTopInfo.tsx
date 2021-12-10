import { DateTime } from "luxon";
import { toFormatDate } from "../../utils/formatPostDate";
import { useAppSelector } from "../../hooks/redux";
import css from "../../assets/scss/modules/Profile.module.scss";

const ProfileTopInfo = () => {
  const { userInfo } = useAppSelector(
    (state) => state.UserInfoReducer
  );

  return (
    <section className="mb-3">
      <div className={css.originBoxWrapper}>
        <div className={css.userInfoTop}>
          <h1 className={css.userFullName}>
            {userInfo?.firstName ?? "Без"} {userInfo?.lastName ?? "Имени"}
          </h1>
          <hr />
          <div className={css.userInfoContent}>
            <div className={css.userInfoBlock}>
              <span className={css.userInfoParam}>День рождения:</span>
              <span className={css.userInfoValue}>
                {userInfo?.dateBirth
                  ? toFormatDate(
                      DateTime.fromFormat("03-01-1999", "dd-mm-yyyy"),
                      "d MMMM y"
                    )
                  : "Не указанно"}
              </span>
            </div>
            <div className={css.userInfoBlock}>
              <span className={css.userInfoParam}>Город:</span>
              <span className={css.userInfoValue}>
                {userInfo?.city ?? "Не указанн"}
              </span>
            </div>
            <div className={css.userInfoBlock}>
              <span className={css.userInfoParam}>Телефон:</span>
              <span className={css.userInfoValue}>
                {<a href={`tel:${userInfo?.phone}`}>{userInfo?.phone}</a> ??
                  "Не указанн"}
              </span>
            </div>
          </div>
        </div>
        <div className={css.userInfoBottom}></div>
      </div>
    </section>
  );
};

export default ProfileTopInfo;
