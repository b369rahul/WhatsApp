import { useMemo } from "react";
import Message from "./Message"

interface AllMessageProps{
    currentPersonId:number|string;
    connections:Connections;
    setConnections:(arg:Connections)=>void
}

// function getDateWithoutTime(date:any){
//     let nowDate  = new Date(date);
//     return nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
// }


export default function AllMessage({currentPersonId, connections, setConnections}:AllMessageProps){

    const memoMessages = useMemo(()=>{
        const messages = connections[currentPersonId].messages || [];

        return Array.from(messages.values());
    },[connections])

    // let prevMessageDate=getDateWithoutTime(messages[messages.size-1].time);
    // let firstMessageDate= getDateWithoutTime(messages[0].time)
    // if(firstMessageDate == getDateWithoutTime(new Date())){
    //     firstMessageDate="Today";
    // }

    // function showMessagesDate(currentMessageDate:any){
    //     let toShow=null;
    //     currentMessageDate = getDateWithoutTime(currentMessageDate)
    //     if(prevMessageDate!=currentMessageDate){
    //         toShow=prevMessageDate;
    //         prevMessageDate=currentMessageDate
    //         if(toShow==getDateWithoutTime(new Date())){
    //             toShow="Today"
    //         }
    //     }
    //     return toShow;
    // }

    return (
        <div className="flex flex-col-reverse overflow-scroll max-h-full items-end h-full mt-auto  bg-[#0D1418] p-2">
            {
                memoMessages.map((_,index)=>{
                    // let dateToShow=showMessagesDate(messages[messages.size-1-msgIndex].time);
                    let msg:Message= memoMessages[memoMessages.length-1-index]
                    return (
                        <Message key={msg.id} 
                        message={msg} 
                        currentPersonId={currentPersonId} 
                        setConnections={setConnections}
                        isLastMessage={index===0}
                        // dateToShow={dateToShow}
                    />)
                })
            }
            {/* <div className="self-center">
                {firstMessageDate}
            </div> */}
        </div>
    );
}