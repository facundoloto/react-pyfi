import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../api/fetchApi";

async function fetchPosts(QueryFunctionContext) {
  const [_, allPost] = QueryFunctionContext.queryKey;
  const { data } = await api.get(`/post/`);
  return data;
}

export function useFetchPosts(postsUsers) {
  return useQuery(["posts", postsUsers], fetchPosts);
}