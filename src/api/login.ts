import request from "@/utils/requests";
let config = {
    headers: {'Content-Type': "application/json"}
};
 export function doLogin(admin:String) {
    return request.post<any,ResponseSuccess<{code:string}>>('/user/login',admin,config)
 }