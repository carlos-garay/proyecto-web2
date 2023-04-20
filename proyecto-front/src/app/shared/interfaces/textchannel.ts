export interface Textchannel {
    _id:string,
    title:string,
    arrMembers:string[],
    private:boolean,
    arrMessages:string[], //este va a tener un mensaje no populado
    __v?:number
}


/*
{
    "_id": "643dab07cd8ff99e26bc3f56",
    "title": "TituloCanalCambio",
    "arrMembers": [
    "643aed8b64f01a772cb50353",
    "643af5d692b9f9f15fb1544b",
    "643b02446664b9a3efbf1e60"
    ],
    "private": false,
    "arrMessages": [],
    "__v": 0
}
*/