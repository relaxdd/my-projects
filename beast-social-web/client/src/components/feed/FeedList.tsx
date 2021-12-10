import { FC } from "react";
import IPostWithUser from "../../types/IPostWithUser";
import FeedItem from "./FeedItem";

interface FeedListProps {
  feeds: IPostWithUser[];
}

const FeedList: FC<FeedListProps> = ({ feeds }) => {
  return (
    <section>
      <div className="row mb-3" style={{ gap: "15px 0" }}>
        {feeds.length ? (
          feeds.map((feed) => <FeedItem feed={feed} key={feed._id} />)
        ) : (
          <p>Мы не смогли найти подходящий постов для вас</p>
        )}
      </div>
    </section>
  );
};

export default FeedList;
