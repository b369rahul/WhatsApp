import { useContext, useRef, useState, useMemo, useCallback } from "react";
import SearchBar from "./SearchBar";
import { MyConversationsList , AllConversations} from "../context";
import ChatPreview from "./ChatPreview";

interface ConversationListProps{
    
}



export default function ConversationList ({}:ConversationListProps){
    const myConversationsList = useContext(MyConversationsList)
    const allConversations = useContext(AllConversations)

    const [searchText,setSearchText] = useState('');
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
        return (
            <div ref={containerRef} className="z-5 overflow-y-auto h-full bg-[#1e2428]">
                <ul className="divide-y divide-[#242d32]">
                    {filteredConversationsWithLastMesssages.map(({conversationId ,user, lastMessage}) => (
                        <ChatPreview 
                            key={conversationId}
                            conversationId ={conversationId}
                            lastMessage={lastMessage}
                            user={user}
                            className="hover:bg-[#303b42] transition-colors duration-200 w-full" 
                            containerRef={containerRef}
                        />
                    ))}
                </ul>
            </div>
        )
    },[filteredConversationsWithLastMesssages])
    
    const containerRef = useRef(null)
    return (
        <>
            <SearchBar searchText={searchText} setSearchText={setSearchText} className="w-full p-4 bg-[#1e2428] border-b-[0.5px] border-[#242d32]"/>
            <MessageList/>
        </>
    );
}