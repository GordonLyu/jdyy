import request from "@/utils/requests";
let config = {
    headers: {"Content-Type": "application/json"}
};
 export function doRegister(admin:any) {
    return request.put<any,ResponseSuccess<{code:string}>>('/user/register',admin,config)
 }