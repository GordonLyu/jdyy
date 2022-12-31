import request from "@/utils/requests";

//获取所有评论
export const getAll = () => {
  return request.get("remark/getAll");
};

//通过音乐ID找评论
export const getByMusic = (mid: any) => {
  return request.get("remark/getByMusic", {
    params: { mid },
  });
};

//通过用户ID查询评论
export const getByUser = (uid: any) => {
  return request.get("remark/getByUser", {
    params: { uid },
  });
};

//添加评论
export const add = (data:any) => {
  return request.put("remark/add", data);
};

//删除评论
export const deleteRemark = (id: number) => {
  return request.delete("remark/remove", {
    params: { id },
  });
};

// export { deleteRemark as delete };
