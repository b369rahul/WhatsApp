import SendMessage from "./SendMessage";
import AllMessage from "./AllMessage";
import ChatProfile from "./ChatProfile";

interface ConversationProps{
    className?:string,
}

export default function Conversation({className=" "}:ConversationProps){

    return (

    <div className={`relative flex flex-col overflow-hidden justify-between ${className}`}>
        
        <ChatProfile className = "sticky top-0 z-3 h-20 w-full pr-5 pl-2 border-b-[0.5px] bg-[#4590f0] "/>
        <AllMessage />
        <SendMessage/>

    </div>
   );
}