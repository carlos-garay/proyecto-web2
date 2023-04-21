
export interface User {
    //casi casi el modelo de mongoDB
    _id:string,
    name:string,
    email:string,
    password:string,
    token?:string,
    arrGroups:string[],
    arrFriends:string[],
    arrRequestsSent:string[],
    arrRequestsReceived:string[],
    arrDirectMessages:string[],
    __v?:number,
    image?:string
}


/*

{
  "_id": "643aed8b64f01a772cb50353",
  "name": "usuario1",
  "email": "otro1@test.com",
  "password": "password",
  "token": "undefined",
  "arrGroups": [
    {
      "_id": "643b6d6f23cf96aafcebfb06",
      "title": "grupo1",
      "image": "noimage",
      "arrUsers": [
        "643aed8b64f01a772cb50353",
        "643af5d692b9f9f15fb1544b",
        "643b02446664b9a3efbf1e60"
      ],
      "arrAdmins": [
        "643aed8b64f01a772cb50353"
      ],
      "arrChannels": [
        "643b898e18c959b67911bae3"
      ],
      "arrAudioChannels": [
        "643b8cb186388eeae83cec80"
      ],
      "__v": 0
    }
  ],
  "arrFriends": [],
  "arrRequestsSent": [
    {
      "_id": "643b678619262fca193b0fb2",
      "sender": "643aed8b64f01a772cb50353",
      "receiver": "643af5d692b9f9f15fb1544b",
      "status": 1,
      "__v": 0
    }
  ],
  "arrRequestsReceived": [],
  "arrDirectMessages": [],
  "__v": 0
}

*/