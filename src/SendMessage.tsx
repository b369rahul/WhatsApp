import { RiAttachment2 } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import { sendMessageById } from "./functions";

interface SendMessageProps{
    currentPersonId:string|number,
    setConnections:(arg:Connections)=>void
}

export default function SendMessage({currentPersonId, setConnections}:SendMessageProps){
    const [text,setText]=useState(localStorage.getItem(`${currentPersonId}-draftMessage`) || "");

    function onSubmitHandler(e:React.FormEvent){
        e.preventDefault()
        if(text=='')return;
        const updatedConnections =sendMessageById(currentPersonId,text)
        setConnections(updatedConnections)
        setText('');
        sessionStorage.setItem(`${currentPersonId}-draftMessage`,'')
    }

    function onChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
        setText(e.target.value);
        sessionStorage.setItem(`${currentPersonId}-draftMessage`,e.target.value)
    }

    return (
        <div className="flex flex-row items-center h-20 w-full justify-self-end border-t-[0.5px] bg-[#2b2c2e] z-4 grow-0 shrink-0">
            <RiAttachment2 className="w-8 h-8 mx-2"/>
            <form className="w-full h-10 flex flex-row" onSubmit={onSubmitHandler}>
                <input placeholder="Type Message to send...." value={text} className="w-full pl-2 rounded-lg h-10 bg-[#1a1d1e] border-[0.5px]" onChange={onChangeHandler}/>
                <button type="submit">
                    <IoMdSend className="w-8 h-8 mx-2"/>
                </button>
            </form>
        </div>
    );
}