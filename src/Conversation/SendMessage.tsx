import { RiAttachment2 } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { useState, useContext } from "react";
import { DispatchAllConversations, CurrentConvoIdContext } from "../context";

interface SendMessageProps{
}

export default function SendMessage({}:SendMessageProps){
    const currentConversationId = useContext(CurrentConvoIdContext)
    const dispatchAllConversations = useContext(DispatchAllConversations)
    if(!currentConversationId || !dispatchAllConversations)return null;

    const [text,setText]=useState(localStorage.getItem(`${currentConversationId}-draftMessage`) || "");

    function onSubmitHandler(e:React.FormEvent){
        e.preventDefault()
        if(text=='')return;
        dispatchAllConversations!({
            type:"add_message",
            msgText:text,
            conversationId:currentConversationId!
        })
        setText('');
        localStorage.setItem(`${currentConversationId}-draftMessage`,'')
    }

    function onChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
        setText(e.target.value);
        localStorage.setItem(`${currentConversationId}-draftMessage`,e.target.value)
    }

    return (
        <div className="flex flex-row items-center h-20 w-full justify-self-end border-t-[0.5px] bg-[#4590f0] z-4 grow-0 shrink-0">
            <RiAttachment2 className="w-8 h-8 mx-2"/>
            <form className="w-full h-10 flex flex-row" onSubmit={onSubmitHandler}>
                <input placeholder="Type Message to send...." value={text} className="w-full pl-2 rounded-lg h-10 bg-[#ffffff] text-black" onChange={onChangeHandler}/>
                <button type="submit">
                    <IoMdSend className="w-8 h-8 mx-2"/>
                </button>
            </form>
        </div>
    );
}