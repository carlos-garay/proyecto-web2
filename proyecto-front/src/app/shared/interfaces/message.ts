
export interface Message {
    _id:string,
    sender:string,
    image?:string,
    content:string,
    idChannel:string,
    dateTime: Date,
    __v?:number
}
