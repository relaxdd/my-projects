import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import $api from "../../http";
import { ResError } from "../../services/UserService";
import { enumSetLikePage, newPostProps, setLikeDataProps } from "../../types/";
import { sortByDate } from "../../utils/postUtils";
import { EnumPostsOrderby } from "./../../types/index";
import IPost from "./../../types/IPost";

interface PostsState {
  posts: IPost[] | null;
  orderby: EnumPostsOrderby;
  page: number;
  isPostsLoading: boolean;
  isPostsError: boolean;
  PostsError: string;
}

const initialState: PostsState = {
  posts: null,
  orderby: EnumPostsOrderby.desc,
  page: 1,
  isPostsLoading: false,
  isPostsError: false,
  PostsError: "",
};

// TODO: Доделать выборку страниц и диспач для смены страниц
export const fetchPostsByName = createAsyncThunk(
  "post/fetchPostsByName",
  async (username: string, { rejectWithValue, signal }) => {
    try {
      const res = await $api.get<IPost[]>(`/posts?username=${username}`, {
        signal,
      });
      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      return rejectWithValue(err.message);
    }
  }
);

export const addNewPost = createAsyncThunk(
  "post/addPost",
  async (newPost: newPostProps, thunkAPI) => {
    try {
      const res = await $api.post<IPost>("/posts/create", newPost);
      return res.data;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const removePost = createAsyncThunk(
  "post/removePost",
  async (id: string, thunkAPI) => {
    try {
      await $api.post("/posts/delete", { id });
      return id;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export interface setLikeResponseData {
  postId: string;
  qtyLikes: number;
  typePage: enumSetLikePage;
}

export const setPostLike = createAsyncThunk(
  "post/setLike",
  async (setLikeData: setLikeDataProps, thunkAPI) => {
    try {
      const res = await $api.post<number>("/posts/change/like", setLikeData);
      const answer: setLikeResponseData = {
        postId: setLikeData.postId,
        qtyLikes: res.data,
        typePage: setLikeData.typePage,
      };

      return answer;
    } catch (e) {
      const err = e as AxiosError<ResError>;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    changeOrderby(state, action: PayloadAction<EnumPostsOrderby>) {
      state.orderby = action.payload;
    },
  },
  extraReducers: {
    // Получение постов | Get all posts
    [fetchPostsByName.pending.type]: (state) => {
      state.isPostsLoading = true;
    },
    [fetchPostsByName.fulfilled.type]: (
      state,
      action: PayloadAction<IPost[]>
    ) => {
      state.isPostsLoading = false;
      state.PostsError = "";
      state.posts = sortByDate([...action.payload], {
        prop: "date",
        desc: state.orderby === "desc",
      });
    },
    [fetchPostsByName.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isPostsLoading = false;
      state.isPostsError = true;
      state.PostsError = action.payload;
    },
    // Добавление постов | Add new post
    [addNewPost.fulfilled.type]: (state, action: PayloadAction<IPost>) => {
      const posts = state.posts as IPost[];

      state.PostsError = "";
      state.posts = [action.payload, ...posts];
    },
    [addNewPost.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isPostsLoading = false;
      state.isPostsError = true;
      state.PostsError = action.payload;
    },
    // Удаление поста | Remove post
    [removePost.fulfilled.type]: (state, action: PayloadAction<string>) => {
      const posts = state.posts as IPost[];

      state.PostsError = "";
      state.posts = [...posts].filter((post) => post._id !== action.payload);
    },
    // Изменение лайка | set Like
    [setPostLike.fulfilled.type]: (
      state,
      action: PayloadAction<setLikeResponseData>
    ) => {
      if (action.payload.typePage === "postPage") {
        const posts = state.posts as IPost[];

        const postIndex = posts.findIndex(
          (post) => post._id === action.payload.postId
        );
        posts[postIndex].likes = action.payload.qtyLikes;
      }
    },
  },
});

export const PostReducer = PostSlice.reducer;
export const PostActions = PostSlice.actions;

// export const checkAuth = createAsyncThunk("user/checkAuth", async (_, thunkApi) => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/refresh", {
//         withCredentials: true,
//       });
//       this.pushStore(res);
//     } catch (e) {
//       throw new Error(e?.response?.data?.message);
//     } finally {
//       setTimeout(() => {
//         this.setLoading(false);
//       }, 500);
//     }
// });

/* checkAuth = async () => {
    setLoading(true);
  }; */
