import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
// components
import Header from "./components/header/Header";
import Loader from "./components/ui/Loader";
import Site from "./components/Site";
import Notices from "./components/notices/Notices";
import ErrorNotice from "./components/notices/ErrorNotice";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkUserAuth, removeUserLoading } from "./store/reducers/UserSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/style.scss";

function App() {
  const dispatch = useAppDispatch();
  const { isUserLoading } = useAppSelector((store) => store.UserReducer);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) dispatch(checkUserAuth());
    else dispatch(removeUserLoading());
    // eslint-disable-next-line
  }, []);

  if (isUserLoading) {
    return (
      <div className="loading-page__wrapper">
        <Loader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <Site />
      <Notices />
      <ErrorNotice />
    </BrowserRouter>
  );
}

export default App;
