import { memo, useEffect, useRef, useState } from "react";
import { MdOutlineDeleteSweep } from "react-icons/md";
import PopUpForm from "./PopUpForm";
import ChatDeleteForm from "./ChatDeleteForm";
import "./ChatPreview.css"


import {getPersonById} from "./functions"
interface ChatPreviewProps{
    className:string,
    currentPersonId:number|string,
    setCurrentPersonIdHandler:(id:number|string)=>void,
    deleteCurrentPersonHandler:(id:number|string)=>void,
    lastMessage:string | undefined,
    containerRef:React.RefObject<HTMLDivElement> | null
}


const ChatPreview =  memo(({className, currentPersonId, setCurrentPersonIdHandler, deleteCurrentPersonHandler, containerRef, lastMessage}:ChatPreviewProps)=>{

    const [isPopUpVisible, setIsDeleteChatVisible] = useState(false)
    const chatRef = useRef<HTMLDivElement | null>(null)
    const toolTipRef = useRef<HTMLDivElement | null>(null)
    const currentPerson = getPersonById(currentPersonId)
    const [toolTipPosition, setToolTipPosition]= useState({top:0, left:0})

    useEffect(()=>{
        if(toolTipRef && containerRef && chatRef){
            

            const updatePosition = ()=>{
                const elem = chatRef.current!.getBoundingClientRect();
                const toolTipElem = toolTipRef.current!.getBoundingClientRect();
                let top=(elem.top +elem.bottom)/2;
                if(top + toolTipElem.height > window.innerHeight){
                    top = top-toolTipElem.height
                    top = Number(top.toFixed(0))
                }
                let left=(elem.right +2 )
                setToolTipPosition({top:top, left:left})
            }
            updatePosition()
            
            containerRef.current?.addEventListener("scroll", updatePosition);
            window.addEventListener("resize", updatePosition);
    
            return () => {
                containerRef.current?.removeEventListener("scroll", updatePosition);
                window.removeEventListener("resize", updatePosition);
            };
        }
    },[containerRef])

    return (
    <li  className={"flex items-center justify-between flex-row hover:cursor-pointer "+ " " + className} onClick={()=>setCurrentPersonIdHandler(currentPerson.id)}>
        <div className="flex items-center w-[80%] h-full">
            <img src={currentPerson.profileImg} alt="User" className="rounded-full h-12 w-12 mr-5 grow-0 shrink-0" />
            <div className="w-[80%] flex flex-col h-20 pt-2 relative">
                <h2 className="truncate overflow-hidden w-full text-nowrap font-bold justify-start">{currentPerson.name}</h2>
                <div  className="previewLastMessage  ">
                    <p ref={chatRef} className="w-fit max-w-full text-sm line-clamp-2 ">
                    {lastMessage}
                    </p>
                </div>
                <div ref={toolTipRef} className={`z-10 invisible previewLastMessageToolTip fixed bg-blue-500 ml-2 rounded-md text-white px-6 py-3 max-w-[40%] w-fit break-words `}
                         style={{top:toolTipPosition.top, left:toolTipPosition.left}}
                         >
                        {lastMessage}
                </div>
            </div>
        </div>
        {isPopUpVisible?
            <PopUpForm>
                <ChatDeleteForm setIsDeleteChatVisible={setIsDeleteChatVisible} deleteChat={()=>deleteCurrentPersonHandler(currentPerson.id)}/>
            </PopUpForm>:null
        }
        <MdOutlineDeleteSweep className="h-6 w-6 grow-0 shrink-0" onClick={(e)=>{
            e.stopPropagation()
            setIsDeleteChatVisible(true)}}/>
    </li>
    );
})
export default ChatPreview;