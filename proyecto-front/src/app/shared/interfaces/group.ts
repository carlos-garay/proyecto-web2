import { User } from "./user";

export interface Group {
    _id:string,
    title:string,
    image:string,
    arrUsers:string[],
    arrAdmins:string[],
    arrChannels:string[],
    arrAudioChannels:string[],
    __v?:number,
    
}
/*

[
    {
      "_id": "643d910ee3f376459277de77",
      "title": "grupo1",
      "image": "noimage",
      "arrUsers": [
        "643aed8b64f01a772cb50353",
        "643aed8b64f01a772cb50353",
        "643af5d692b9f9f15fb1544b",
        "643b02446664b9a3efbf1e60"
      ],
      "arrAdmins": [
        "643aed8b64f01a772cb50353"
      ],
      "arrChannels": [
        "643dab07cd8ff99e26bc3f56",
        "643dbf0527bc80c7910407c9"
      ],
      "arrAudioChannels": [],
      "__v": 0
    },
    {
      "_id": "643dbbb427bc80c7910407c4",
      "title": "grupo2",
      "image": "noimage",
      "arrUsers": [
        "643aed8b64f01a772cb50353",
        "643af5d692b9f9f15fb1544b"
      ],
      "arrAdmins": [
        "643aed8b64f01a772cb50353"
      ],
      "arrChannels": [
        "643dbf1c27bc80c7910407cc"
      ],
      "arrAudioChannels": [],
      "__v": 0
    }
  ]

*/