import ChatPreview from "./ChatPreview";
import SendMessage from "./SendMessage";
import AllMessage from "./AllMessage";

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

export default function Conversation({connections, personId, setConnections}:props){
    const person = connections.find((person)=>person.id==personId)
    
    return (
    <div className="w-3/4 h-full border-[0.5px] relative flex flex-col overflow-hidden justify-between">
        <ChatPreview className = "bg-[#2a2f32] z-10 grow-0 shrink-0" person={{name:person!.name, profileImg:person!.profileImg}}/>
        <AllMessage connections={connections} personId={personId} setConnections={setConnections}/>
        <SendMessage connections={connections} personId={personId} setConnections={setConnections}/>
    </div>
   );
}