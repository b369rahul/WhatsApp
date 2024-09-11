import Message from "./Message"
// import { useRef } from "react"

interface Person{
    id:string|number,
    name:string,
    profileImg:string,
    messages?:any[]
}

interface props{
    connections:Person[],
    personId:string|number,
    setConnections:(arg:any)=>void
}

function getDateWithoutTime(date:any){
    let nowDate  = new Date(date);
    return nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
}

   

export default function AllMessage({connections, personId, setConnections}:props){

    const person = connections.find((person:Person)=>person.id==personId)
    if(!person || !person.messages || !person.messages.length)return (
        <div className="flex flex-col-reverse overflow-scroll max-h-full items-end h-full mt-auto space-y-4 bg-[#0D1418] p-2"></div>
    );


    let prevMessageDate=getDateWithoutTime(person.messages![person.messages!.length-1].time);
    let lastMessageDate= getDateWithoutTime(person.messages[0].time)
    if(lastMessageDate == getDateWithoutTime(new Date())){
        lastMessageDate="Today";
    }

    function showMessagesDate(currentMessageDate:any){
        let toShow=null;
        currentMessageDate = getDateWithoutTime(currentMessageDate)
        if(prevMessageDate!=currentMessageDate){
            toShow=prevMessageDate;
            prevMessageDate=currentMessageDate
            if(toShow==getDateWithoutTime(new Date())){
                toShow="Today"
            }
        }
        return toShow;
    }

    return (
        <div className="flex flex-col-reverse overflow-scroll max-h-full items-end h-full mt-auto  bg-[#0D1418] p-2">
            {
                person.messages!.map((msg,index)=>{
                    let dateToShow=showMessagesDate(person.messages![person.messages!.length-1-index].time);
                  return   (
                        <Message key={msg.id} message={person.messages![person.messages!.length-1-index]} personId={personId} 
                            connections={connections} setConnections={setConnections} 
                            dateToShow={dateToShow}
                        />
                  )
                })

            }
            <div className="self-center">
                {lastMessageDate}
            </div>
        </div>
    );
}