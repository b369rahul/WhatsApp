import { memo } from "react"
import { CurrentConvoIdContext, MyConversationsList } from "../context"
import { useContext } from "react"
interface ChatProfileProps{
    className:string,
}

const ChatProfile = memo( ({className=" "}:ChatProfileProps) =>{
    const currentConvoId = useContext(CurrentConvoIdContext)
    const myConversationsList = useContext(MyConversationsList)
    
    if(!currentConvoId) throw new Error("Cannot find current Conversation ID caht profile")
    const currentPerson = myConversationsList.find(({conversationId})=>{
        return conversationId===currentConvoId
    })?.user
    
    if(!currentPerson) throw new Error ("Cannot find current Person in chat profile")
    return (
        <div className={`flex justify-between items-center flex-row grow-0 shrink-0 ${className}`}>
            <div className="flex items-center max-w-fit ">
                <img src={currentPerson.profileImg} alt={currentPerson.name} className="rounded-full h-12 w-12 mr-5" />
                <h2>{currentPerson.name}</h2>
            </div>
        </div>
    );
})

export default ChatProfile;