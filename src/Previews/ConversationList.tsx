import { useContext, useMemo, useCallback } from "react";
import { MyConversationsList , AllConversations, CurrentConvoIdContext} from "../context";
import ChatPreview from "./ChatPreview";

interface ConversationListProps{
    className?:string,
    searchText?:string,
    containerRef?:React.RefObject<HTMLDivElement>
}



export default function ConversationList ({className="", searchText="", containerRef}:ConversationListProps){
    const myConversationsList = useContext(MyConversationsList)
    const allConversations = useContext(AllConversations)

    const filteredConversations = useMemo(()=>{
        return (
            myConversationsList.filter(({user})=>{
                return user.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
            })
        )
    },[myConversationsList,searchText])

    const filteredConversationsWithLastMesssages = useMemo(()=>{
        return filteredConversations.map(({conversationId, user})=>{
            let lastMessage:string|null = null;
            if(conversationId in allConversations){
                const convo = allConversations[conversationId];
                lastMessage = convo[convo.length-1]?.text
            }
            return {
                conversationId:conversationId,
                user:user,
                lastMessage:lastMessage
            }
        })
    },[allConversations,filteredConversations])

    const MessageList = useCallback(()=>{
        const currentConvoId = useContext(CurrentConvoIdContext)

        return (
            <div className={`${className}`}>
                <ul className="">
                    {filteredConversationsWithLastMesssages.map(({conversationId ,user, lastMessage}) => {
                        const className = currentConvoId===conversationId ? "bg-[#4590f0] hover:bg-[#4590f0] text-white hover:no":"text-[#4590ff] hover:bg-[#ffffff]" 
                        return (<ChatPreview 
                            key={conversationId}
                            conversationId ={conversationId}
                            lastMessage={lastMessage}
                            user={user}
                            className={" transition-colors duration-200 w-full " + className }
                            containerRef={containerRef}
                        />)
                    })}
                </ul>
            </div>
        )
    },[filteredConversationsWithLastMesssages])
    
    return (
        <>
            <MessageList/>
        </>
    );
}