import request from "@/utils/requests";
import type { AxiosRequestConfig } from "axios";
import type { addUserRequest } from "../types/User";

//分页获取用户
export const getUserPage = (currentPage: number, pageSize: number) => {
  return request.get("user/page", {
    params: { currentPage, pageSize },
  });
};

//添加用户
export const add = (data: addUserRequest, config?: AxiosRequestConfig) => {
  return request.put("user/add", data, config);
};

//删除用户
const deleteUser = (uid: number) => {
  return request.delete("user/remove", {
    params: {
        uid
    },
  });
};

export { deleteUser as delete };
