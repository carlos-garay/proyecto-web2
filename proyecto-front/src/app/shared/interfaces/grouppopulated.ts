import { Audiochannel } from "./audiochannel";
import { Textchannel } from "./textchannel";
import { User } from "./user";

export interface Grouppopulated {
    _id:string,
    title:string,
    image:string,
    arrUsers:User[],
    arrAdmins:User[],
    arrChannels:Textchannel[], //va a ser tipo interfaz textChannel
    arrAudioChannels:Audiochannel[], //tipo interfaz audioChannel
    __v?:number,
    
}
