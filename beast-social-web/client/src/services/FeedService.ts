import $api from "../http";
import IPostWithUser from "../types/IPostWithUser";

class FeedService {
  getMyFeeds = async (userId: string) => {
    try {
      const res = await $api.post<IPostWithUser[]>("/posts/feeds", { userId });
      return res.data as IPostWithUser[];
    } catch (e) {
      console.error(e);
      return [];
    }
  };
}

export default new FeedService();
