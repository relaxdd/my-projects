import { Row, Col } from "react-bootstrap";
import FriendsList from "../components/friends/FriendsList";

const Friends = () => {
  return (
    <Row className="row">
      <Col xs="8">
        <FriendsList />
      </Col>
      <Col xs="4">
        <aside></aside>
      </Col>
    </Row>
  );
};

export default Friends;
