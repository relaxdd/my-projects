import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logoutUser } from "../../store/reducers/UserSlice";
import AuthModal from "../auth/AuthModal";

const Authorization = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((store) => store.UserReducer);

  return (
    <div className="header-authorization">
      {!isAuth ? (
        <AuthModal />
      ) : (
        <button
          type="button"
          className="btn btn-outline-light me-2"
          onClick={() => dispatch(logoutUser())}
        >
          Sign out
        </button>
      )}
    </div>
  );
};

export default Authorization;
