import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useContext, useEffect, useRef, useState, memo } from "react";
import "./Message.css"
import PopUpForm from "../Popups/PopUpForm";
import MessageDeleteForm from "../Popups/MessageDeleteForm";
import MessageEditForm from "../Popups/MessageEditForm"
import { DispatchAllConversations, CurrentConvoIdContext } from "../context";

interface MessageProps {
    message: Message,
    isLastMessage:boolean
}


const Message = memo(({ message,isLastMessage}: MessageProps)=> {
    const ref= useRef<HTMLDivElement>(null)
    const dispatchAllConversations = useContext(DispatchAllConversations)
    const currentConversationId = useContext(CurrentConvoIdContext)

    if(!currentConversationId)return null;

    const[isEditMessageVisible, setIsEditMessageVisible] = useState(false)
    const[isDeleteMessageVisible, setIsDeleteMessageVisible] = useState(false)

    function deleteMessage() {
        dispatchAllConversations!({
            type:"delete_message",
            conversationId:currentConversationId!,
            msgId:message.id
        })
    }

    function editMessage(text:string){
        dispatchAllConversations!({
            type:"edit_message",
            conversationId:currentConversationId!,
            msgId:message.id,
            msgText:text
        })
    }
    
    useEffect(()=>{
        if(isLastMessage && ref.current){
            ref.current.scrollIntoView();
        }
    },[isLastMessage])

    return (
            <div ref={ref}>
                {isEditMessageVisible?
                 <PopUpForm>
                    <MessageEditForm setIsEditMessageVisible={setIsEditMessageVisible} lastMessage={message.text} editMessage={(text:string)=>editMessage(text)}/>
                 </PopUpForm> :null
                }

                {isDeleteMessageVisible?
                 <PopUpForm>
                    <MessageDeleteForm setIsDeleteMessageVisible={setIsDeleteMessageVisible} deleteMessage={deleteMessage}/>
                 </PopUpForm> :null
                }

                <div key={message.id} className="flex message h-fit pl-2  mb-4 mr-2.5">
                    <div className="hidden updateMessage  space-x-1 h-fit flex-row items-center justify-center ">
                        <button className=" " onClick={() => setIsDeleteMessageVisible(true)}>
                            <MdDelete className=" text-[#4590f0] rounded-lg h-4 w-4" />
                        </button>
                        <button className="" onClick={() => setIsEditMessageVisible(true)}>
                            <MdEdit className=" text-[#4590f0] rounded-lg h-4 w-4 " />
                        </button>
                    </div>
                    <div className="bg-[#4590f0] text-white relative border-2 rounded-lg flex flex-col pr-1 py-1 pl-2 min-w-16 max-w-80 text-wrap w-full break-words">
                        <p className="mb-4">{message.text}</p>
                        <p className="absolute bottom-0.5 right-0.5 text-xs">{new Date(message.time).toLocaleTimeString().slice(0, -3)}</p>
                    </div>
                </div>
            </div>
    );
})

export default Message;