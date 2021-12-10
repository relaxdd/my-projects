import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { showNoticeMessage } from "../store/reducers/UserSlice";
import { useEffect } from "react";
import AppRouter from "../router/AppRouter";
import { USER_PATH } from "../router/pathRoutes";
import Sidebar from "./sidebar/Sidebar";
import publicRoutes from "../router/publicRoutes";
import privateRoutes from "../router/privateRoutes";
// bootstrap-react
import { Container, Row, Col } from "react-bootstrap";
import AuthWidget from "./auth/AuthWidget";

const Site = () => {
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAppSelector((store) => store.UserReducer);

  useEffect(() => {
    if (user) {
      if (!user.isActivated) {
        dispatch(
          showNoticeMessage(
            "Пожалуйста подвердите ваш email, мы выслали вам письмо на почту"
          )
        );
      }
    }
  }, [user, dispatch]);

  return (
    <Container>
      <Row>
        <Col xs="2">{isAuth ? <Sidebar /> : <AuthWidget />}</Col>
        <Col xs="10">
          <article>
            {isAuth && user ? (
              <AppRouter
                routes={privateRoutes}
                redirect={`${USER_PATH}/${user.username}`}
              />
            ) : (
              <AppRouter routes={publicRoutes} redirect="/" />
            )}
          </article>
        </Col>
      </Row>
    </Container>
  );
};

export default Site;
