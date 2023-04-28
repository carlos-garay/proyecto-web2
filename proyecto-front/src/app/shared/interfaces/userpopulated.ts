import { Group } from "./group";


export interface Userpopulated {
    _id:string,
    name:string,
    email:string,
    password?:string,
    token?:string,
    arrGroups:Group[], //este es grupo en lugar de string
    arrFriends:string[],
    arrRequestsSent:string[],
    arrRequestsReceived:string[],
    arrDirectMessages:string[],
    __v?:number
}
