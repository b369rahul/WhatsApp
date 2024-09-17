import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import "./Message.css"
import {deleteMessagebyId, editMessageById} from "./functions"
import PopUpForm from "./PopUpForm";
import MessageDeleteForm from "./MessageDeleteForm";
import MessageEditForm from "./MessageEditForm"

interface MessageProps {
    message: Message,
    currentPersonId: string | number,
    setConnections:(arg:Connections)=>void,
    isLastMessage:boolean
}


export default function Message({ message, currentPersonId, setConnections, isLastMessage}: MessageProps) {
    const ref= useRef<HTMLDivElement>(null)

    const[isEditMessageVisible, setIsEditMessageVisible] = useState(false)
    const[isDeleteMessageVisible, setIsDeleteMessageVisible] = useState(false)

    function deleteMessage(msgId: string|number) {

        const updatedConnections = deleteMessagebyId(msgId, currentPersonId)
        setConnections({...updatedConnections});
    }

    function editMessage(msgId:string|number, text:string){
        const updatedConnections = editMessageById(msgId,currentPersonId,text);

        console.log(updatedConnections)
        setConnections({...updatedConnections});
    }
    
    useEffect(()=>{
        if(isLastMessage && ref.current){
            ref.current.scrollIntoView({
                behavior: 'smooth'
              });
        }
    },[isLastMessage])

    return (
            <div ref={ref}>
                {isEditMessageVisible?
                 <PopUpForm>
                    <MessageEditForm setIsEditMessageVisible={setIsEditMessageVisible} lastMessage={message.text} editMessage={(text:string)=>editMessage(message.id,text)}/>
                 </PopUpForm> :null
                }

                {isDeleteMessageVisible?
                 <PopUpForm>
                    <MessageDeleteForm setIsDeleteMessageVisible={setIsDeleteMessageVisible} deleteMessage={()=>deleteMessage(message.id)}/>
                 </PopUpForm> :null
                }

                <div key={message.id} className="flex message h-fit pl-2  mb-4 mr-2.5">
                    <div className="hidden updateMessage  space-x-1 h-fit flex-row items-center justify-center ">
                        <button className=" " onClick={() => setIsDeleteMessageVisible(true)}>
                            <MdDelete className=" text-white rounded-lg h-4 w-4" />
                        </button>
                        <button className="" onClick={() => setIsEditMessageVisible(true)}>
                            <MdEdit className=" text-white rounded-lg h-4 w-4 " />
                        </button>
                    </div>
                    <div className="bg-[#2e7d76] relative border-2 rounded-lg flex flex-col pr-1 py-1 pl-2 min-w-16 max-w-80 text-wrap w-full break-words">
                        <p className="mb-4">{message.text}</p>
                        <p className="absolute bottom-0.5 right-0.5 text-xs">{new Date(message.time).toLocaleTimeString().slice(0, -3)}</p>
                    </div>
                </div>
            </div>
    );
}
