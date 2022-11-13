/// <reference types="vite/client" />

declare global{
    interface ResponseSuccess<T={}>{
        code:number
        message:string;
        data:T;
    }
}
export{};