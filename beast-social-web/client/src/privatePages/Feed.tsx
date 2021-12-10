import { useEffect, useState } from "react";
import FeedService from "../services/FeedService";
import { Col, Row } from "react-bootstrap";
import Loader from "../components/ui/Loader";
import { useAppSelector } from "../hooks/redux";
import FeedList from "../components/feed/FeedList";
import { usePosts } from "../hooks/usePosts";
import IPostWithUser from "../types/IPostWithUser";
import { IUserDto } from "../types/IUser";

// TODO: Сделать ограничение по получению в 20 постов и подгружать при достижении конца экрана
const Feed = () => {
  const [feeds, setFeeds] = useState<IPostWithUser[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  // react store
  const user = useAppSelector((store) => store.UserReducer.user) as IUserDto;
  // filtering feeds
  const filteredFeeds = usePosts("desc", feeds);

  useEffect(() => {
    FeedService.getMyFeeds(user.id)
      .then((feedsList) => setFeeds(feedsList))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Loader />
      </div>
    );
  }

  return (
    <Row className="row">
      <Col xs="8">
        <FeedList feeds={filteredFeeds} />
      </Col>
      <Col xs="4"></Col>
    </Row>
  );
};

export default Feed;
