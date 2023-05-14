import { User } from "./user";

export interface Request {
    _id:string,
    sender:string,
    receiver:string,
    status:number,
    image?: string,
    __v?:number
}
