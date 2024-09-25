import { useMemo, } from "react";
// const Message  = lazy(()=> import("./Message"))
import Message from "./Message"
import { CurrentConvoIdContext, AllConversations } from "../context";
import { useContext } from "react";

interface AllMessageProps{

}

export default function AllMessage({}:AllMessageProps){
    const currentConvoId = useContext(CurrentConvoIdContext)
    const allConversations = useContext(AllConversations)
    if(!currentConvoId)return null;

    const memoMessages = useMemo(()=>{
        const messages = allConversations[currentConvoId]
        return messages || [];
    },[currentConvoId, allConversations])

    return (
        <div className="flex flex-col-reverse overflow-scroll max-h-full items-end h-full mt-auto  bg-[#0D1418] p-2">
            {
                memoMessages.map((_,index)=>{
                    let msg:Message= memoMessages[memoMessages.length-1-index]
                    return (
                        <Message 
                        key={msg.id} 
                        message={msg}
                        isLastMessage={index===0}
                        />
                    )
                })
            }
        </div>
    );
}