import { Col, Row } from "react-bootstrap";

import AppRouter from "../router/AppRouter";
import editRoutes from "../router/editRoutes";
import { EDIT_ENUM } from "../router/pathRoutes";
import EditNav from "./edit/EditNav";

const Edit = () => {
  return (
    <Row>
      <Col xs="8">
        <AppRouter routes={editRoutes} redirect={EDIT_ENUM.PRIMARY} />
      </Col>
      <Col xs="4">
        <EditNav />
      </Col>
    </Row>
  );
};

export default Edit;
