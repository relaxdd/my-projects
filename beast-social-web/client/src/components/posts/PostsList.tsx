import { FC } from "react";
import Post from "../../components/posts/Post";
import PostForm from "./PostForm";
import { PostContext } from "../../Contexts";
import IPost from "../../types/IPost";
import { useAppSelector } from "../../hooks/redux";
import css from "../../assets/scss/modules/PostList.module.scss";
import { Col } from "react-bootstrap";

interface PostListProps {
  posts: IPost[];
  toAuthor?: string;
  setPage: () => void;
  addPostHandler?: (postBody: string) => void;
  removePostHandler?: (id: string) => void;
  formVisible?: boolean;
}

const PostList: FC<PostListProps> = ({
  posts,
  toAuthor,
  setPage,
  addPostHandler,
  removePostHandler,
  formVisible = false,
}) => {
  const { isPostsError } = useAppSelector((store) => store.PostReducer);

  return (
    <PostContext.Provider value={{ posts, setPage, addPostHandler }}>
      <section>
        {formVisible && <PostForm toAuthor={toAuthor ?? ""} />}
        {isPostsError ? (
          <p className={css.rejectedTextError}>
            При загрузке данных произошла ошибка
          </p>
        ) : (
          <div className="row mb-3" style={{ gap: "15px 0" }}>
            {posts.length ? (
              <>
                {posts.map(
                  (post) =>
                    post?.fixed === true && (
                      <Post
                        post={post}
                        toAuthor={toAuthor ?? null}
                        removePostHandler={removePostHandler}
                        fixed
                        key={post._id}
                      />
                    )
                )}
                <hr
                  style={{ margin: "0 auto", width: "calc(100% - 30px)" }}
                />
                {posts.map(
                  (post) =>
                    !post?.fixed && (
                      <Post
                        post={post}
                        toAuthor={toAuthor ?? null}
                        removePostHandler={removePostHandler}
                        key={post._id}
                      />
                    )
                )}
                <Col xs="12">
                  <button
                    type="button"
                    className="btn btn-primary w-100 mb-3"
                    onClick={setPage}
                  >
                    Загрузить еще
                  </button>
                </Col>
              </>
            ) : (
              <p className="text-center" style={{ fontSize: 17 }}>
                Мы не смогли найти подходящий постов для вас
              </p>
            )}
          </div>
        )}
      </section>
    </PostContext.Provider>
  );
};

export default PostList;
