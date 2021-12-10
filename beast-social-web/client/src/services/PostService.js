import $api from "../http";

class PostService {
  getUserPosts = async (username) => {
    try {
      const res = await $api.get("/posts?username=" + username);

      return res.data;
    } catch (e) {}
  };

  addUserPost = async (userId, post) => {
    try {
      const res = await $api.post("/posts/create", {
        userId,
        post,
      });

      return res.data;
    } catch (e) {
      console.error(e.message);
    }
  };

  removeUserPost = async (id) => {
    try {
      await $api.post("/posts/delete", { id });
    } catch (e) {
      console.error(e.message);
    }
  };

  setLike = async (postId, isAddLike) => {
    try {
      const res = await $api.post("/posts/change/like", { postId, isAddLike });
      return res.data;
    } catch (e) {
      console.error(e.message);
    }
  };
}

export default new PostService();
