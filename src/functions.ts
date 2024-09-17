import { v4 as uuid } from 'uuid';

export function getConnections():Connections{
    const connections  = localStorage.getItem("connections");
    return connections? JSON.parse(connections):{}
}

export function getPersonById(currentPersonId:number|string){
    const connections = getConnections();
    if(connections[currentPersonId]){
        return connections[currentPersonId];
    }
    throw Error("No such Person Found")
}

export function getAllMessages(currentPersonId:number|string){
    const connections = getConnections();
    if(connections[currentPersonId]){
        return connections[currentPersonId].messages || [];
    }
    throw Error("No such Person Found")
}

export function deleteConversationById(currentPersonId:number|string){
    const connections = getConnections();
    if(connections[currentPersonId]){
        delete connections[currentPersonId]
        localStorage.setItem("connections",JSON.stringify({...connections}))
        return connections;
    }
    throw Error("No such Person Found")
}

export function makeNewConnection(name:string, profileImg?:string){
    if(!profileImg || profileImg==="undefined")profileImg="https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE";
    return {
        name:name,
        profileImg:profileImg,
        id:uuid(),
        messages:[]
    }
}

export function addNewConnection(name:string, profileImg?:string){
    const newConnection = makeNewConnection(name, profileImg);
    const connections = getConnections();
    connections[newConnection.id] = newConnection;
    localStorage.setItem("connections",JSON.stringify({...connections}))
    return connections;
}


export function deleteMessagebyId(msgId:string|number, currentPersonId:number|string){
    const connections = getConnections();
    const currentPerson =connections[currentPersonId]
    if(!currentPerson){
        throw Error("No such Person Found")
    }
    if(!currentPerson.messages){
        throw Error("No such Message Found")
    }
    let msgToUpdateIndex;
    for (let i=0;i<currentPerson.messages.length;i++){
        if(currentPerson.messages[i].id===msgId){
            msgToUpdateIndex=i;
            break;
        }
    }
    if(msgToUpdateIndex===undefined)throw Error("No such Message Found")

    currentPerson.messages.splice(msgToUpdateIndex,1)

    localStorage.setItem("connections",JSON.stringify({...connections}))
    return connections;
}


export function editMessageById(msgId:string|number, currentPersonId:number|string, text:string){

    const connections = getConnections();
    const currentPerson =connections[currentPersonId]
    if(!currentPerson){
        throw Error("No such Person Found")
    }

    if(!currentPerson.messages){
        throw Error("No such Message Found")
    }
    let msgToUpdateIndex;
    for (let i=0;i<currentPerson.messages.length;i++){
        if(currentPerson.messages[i].id===msgId){
            msgToUpdateIndex=i;
            break;
        }
    }
    if(msgToUpdateIndex===undefined)throw Error("No such Message Found")
    
    currentPerson.messages[msgToUpdateIndex]={
        ...currentPerson.messages[msgToUpdateIndex],
        text:text
    }

    localStorage.setItem("connections",JSON.stringify({...connections}))
    return connections;

}

export function sendMessageById(currentPersonId:number|string, text:string){
    const connections = getConnections();
    const currentPerson =connections[currentPersonId]
    if(!currentPerson){
        throw Error("No such Person Found")
    }
    const msgId = uuid();
    currentPerson.messages.push(
        {
            id:msgId,
            text:text,
            time:Date.now()
        }
    )
    localStorage.setItem("connections",JSON.stringify({...connections}))
    return connections;
}