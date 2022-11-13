import request from "@/utils/requests";
let config = {
    headers: {'Content-Type': "multipart/json, charset=UTF-8"}
};
 export function doLogin(admin:String) {
    return request.post<any,ResponseSuccess<{code:string}>>('/user/login',admin)
 }