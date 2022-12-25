import request from "@/utils/requests";
let config = {
    headers: {'Content-Type': "application/json"}
};


 export function doLogin(admin:String) {
    return request.post<any,ResponseSuccess<{code:string}>>('/user/login',admin,config)
 }
//  export function userInfo(){ // ↓查询用户信息userInfo: () => {
//    return request.get('/user/getAll')
//  }