import PostService from "../services/PostService.js";

class PostController {
  create = async (req, res, next) => {
    try {
      const newPost = await PostService.create(req.body);
      return res.status(201).json(newPost);
    } catch (e) {
      next(e);
    }
  };

  delete = async (req, res, next) => {
    try {
      const deletedPost = await PostService.delete(req.body.id);
      return res.json(deletedPost);
    } catch (e) {
      next(e);
    }
  };

  getOne = async (req, res, next) => {
    try {
      const onePost = await PostService.findOne(req.params.id);
      return res.json(onePost);
    } catch (e) {
      next(e);
    }
  };

  getAllByUserId = async (req, res, next) => {
    try {
      const id = req.query.userId;

      if (!id) {
        res.status(400).json({ message: "Не указан query параметр userId" });
      }

      const userPosts = await PostService.findAllByUserId(id);
      return res.json(userPosts);
    } catch (e) {
      next(e);
    }
  };

  getAllByUsername = async (req, res, next) => {
    try {
      const userPosts = await PostService.findAllByUsername(req.query.username);
      return res.json(userPosts);
    } catch (e) {
      next(e);
    }
  };

  getAllFeeds = async (req, res, next) => {
    try {
      const feeds = await PostService.findAllFeeds(req.body.userId);
      return res.json(feeds);
    } catch (e) {
      next(e);
    }
  };

  setLike = async (req, res, next) => {
    try {
      const newLikes = await PostService.setLike(req.body);
      return res.json(newLikes);
    } catch (e) {
      next(e);
    }
  };

  fixPost = async (req, res, next) => {
    try {
      const status = await PostService.fixPost(req.body.postId);
      return res.json(status);
    } catch (e) {
      next(e);
    }
  };
}

export default new PostController();
