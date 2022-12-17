import request from "@/utils/requests";
import type { AxiosRequestConfig } from "axios";
import type { AddMusicRequest, UpdateMusicRequest } from "../types/Music";

//分页获取音乐
export const getMusicPage = (currentPage: number, pageSize: number) => {
  return request.get("music/page", {
    params: { currentPage, pageSize },
  });
};

//添加音乐
export const addMusic = (
  data: AddMusicRequest,
  config?: AxiosRequestConfig
) => {
  const form = new FormData();
  const { musicName, author, musicFile, coverFile } = data;
  form.append("musicName", musicName);
  form.append("author", author);
  form.append("musicFile", musicFile);
  form.append("coverFile", coverFile);
  return request.put("music/add", form, config);
};

//删除音乐
export const deleteMusic = (mid: number) => {
  return request.delete("music/remove", {
    params: {
      musicId:mid
    },
  });
};

//修改音乐
export const updateMusic = (
  data: UpdateMusicRequest,
  config?: AxiosRequestConfig
) => {
  return request.patch("music/modify", data, config);
};
