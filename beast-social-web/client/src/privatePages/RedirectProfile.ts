import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Context } from "../Contexts";

const RedirectProfile = () => {
  const { store } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (!store.isAuth) history.push("/");
    else history.push("/user/" + store.user.username);
  }, [store.isAuth, history, store.user.username]);

  return null;
};

export default RedirectProfile;
