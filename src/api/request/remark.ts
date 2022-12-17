import request from "@/utils/requests";

//获取所有评论
export const getAll = () => {
  return request.get("remark/getAll");
};

//通过音乐ID找评论
export const getByMusic = (mid: number) => {
  return request.get("remark/getByMusic", {
    params: { mid },
  });
};

//通过用户ID查询评论
export const getByUser = (uid: number) => {
  return request.get("remark/getByUser", {
    params: { uid },
  });
};

//添加评论
export const add = (mid: number, uid: number, content: string) => {
  const data = { mid, uid, content };
  return request.put("remark/add", data);
};

//删除评论
const deleteRemark = (id: number) => {
  return request.delete("remark/remove", {
    params: { id },
  });
};

export { deleteRemark as delete };
