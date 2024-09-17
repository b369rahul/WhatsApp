import SendMessage from "./SendMessage";
import AllMessage from "./AllMessage";
import ChatProfile from "./ChatProfile";

interface ConversationProps{
    currentPersonId:string |number ,
    className:string,
    connections:Connections;
    setConnections:(arg:Connections)=>void
}

export default function Conversation({currentPersonId, connections,setConnections,className=" "}:ConversationProps){

    return (

    <div className={`relative flex flex-col overflow-hidden justify-between ${className}`}>
        
        <ChatProfile className = "sticky top-0 z-3 bg-[#2b2c2e] h-20 w-full pr-5 pl-2 border-b-[0.5px] " currentPersonId={currentPersonId}/>
        <AllMessage currentPersonId={currentPersonId} connections={connections} setConnections={setConnections} />
        <SendMessage currentPersonId={currentPersonId} setConnections={setConnections}/>

    </div>
   );
}