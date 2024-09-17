interface Connections{
    [id:number|string]:Person
}

interface Person{
    id:any;
    profileImg:string;
    name:string;
    messages:Message[]
}

interface Message{
    id:number|string;
    text:string;
    time:number;
}