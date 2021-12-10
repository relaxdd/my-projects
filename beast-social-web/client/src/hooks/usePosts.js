import { useMemo } from "react";
import { sortByDate } from "../utils/postUtils";

// Сортировка по дате создания
export const useSortedByOrderbyPosts = (orderby, posts) => {
  const sortedPosts = useMemo(() => {
    return sortByDate([...posts], { prop: "date", desc: orderby === "desc" });
  }, [orderby, posts]);

  return sortedPosts;
};

// Полная фильтрация
export const usePosts = (orderby, posts) => {
  const byOrderby = useSortedByOrderbyPosts(orderby, posts);
  return byOrderby;
};
