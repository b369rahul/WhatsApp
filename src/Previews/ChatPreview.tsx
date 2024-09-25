import React,{ useContext, useLayoutEffect, useRef, useState } from "react";
import { MdOutlineDeleteSweep } from "react-icons/md";
import PopUpForm from "../Popups/PopUpForm";
import ChatDeleteForm from "../Popups/ChatDeleteForm";
import { DispatchMyConversationsist, DispatchCurrentConvoIdContext, CurrentConvoIdContext } from "../context";

interface ChatPreviewProps{
    className:string
    lastMessage:string | null,
    containerRef:React.RefObject<HTMLDivElement> | null
    user:User,
    conversationId:NonNullable<ConversationId>
}

const ChatPreview = ({className, containerRef, lastMessage, user, conversationId}:ChatPreviewProps)=>{
    const dispatchMyConversationsList  = useContext(DispatchMyConversationsist)
    const setCurrentConvoId = useContext(DispatchCurrentConvoIdContext)
    const currentConvoId = useContext(CurrentConvoIdContext)
    console.log("sss")

    const [isDeleteChatVisisble, setIsDeleteChatVisible] = useState(false)
    const chatRef = useRef<HTMLDivElement | null>(null)
    const toolTipRef = useRef<HTMLDivElement | null>(null)
    const [toolTipPosition, setToolTipPosition]= useState({top:0, left:0})
    
    const deleteChat = ()=>{
        if(currentConvoId === conversationId){
            setCurrentConvoId!(null)
        }
        dispatchMyConversationsList!({
            type:"delete",
            conversationId:conversationId
        })
    }

    const setCurrentPersonId = ()=>{
        setCurrentConvoId!(conversationId)
    } 

    useLayoutEffect(()=>{
        if(toolTipRef.current && containerRef?.current && chatRef.current){
            
            if(chatRef.current!.scrollHeight <= chatRef.current!.clientHeight){
                return;
            }
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

            let timeOutId:number | undefined;
            const handleMouseOver = ()=>{
                timeOutId = setTimeout(()=>{
                    updatePosition()
                    toolTipRef.current!.style.visibility = "visible"
                },2000)
            }
            const handleMouseLeave = ()=>{
                clearTimeout(timeOutId)
                toolTipRef.current!.style.visibility = "hidden"
            }
            chatRef.current!.addEventListener("mouseover",handleMouseOver)
            chatRef.current!.addEventListener("mouseleave",handleMouseLeave)

            const handleScroll = ()=>{
                if(toolTipRef.current!.style.visibility === "visible"){
                    updatePosition()
                }
            }

            containerRef.current?.addEventListener("scroll", handleScroll);
            // window.addEventListener("resize", updatePosition);
    
            return () => {
                containerRef.current?.removeEventListener("scroll", updatePosition);
                // window.removeEventListener("resize", updatePosition);
                chatRef.current!.removeEventListener("mouseover",handleMouseOver)
                chatRef.current!.removeEventListener("mouseleave",handleMouseLeave)
            };
        }
    },[lastMessage])

    return (
    <li>
        <div className={`flex items-center justify-between flex-row hover:cursor-pointer px-2 ${className}`} onClick={setCurrentPersonId}>
            <div className="flex items-center w-[80%] h-full">
                <img src={user.profileImg} alt="User" className="rounded-full border-[2px] outline-red-600 h-12 w-12 mr-5 grow-0 shrink-0" />
                <div className="w-[80%] flex flex-col h-24 pt-2 relative">
                    <h2 className="truncate overflow-hidden w-full text-nowrap font-bold justify-start">{user.name}</h2>
                    <div  className="">
                        <p ref={chatRef} className="w-fit max-w-full text-sm line-clamp-3 text-wrap break-words">
                        {lastMessage}
                        </p>
                    </div>
                    {
                        <div ref={toolTipRef} className={`z-10 invisible fixed bg-[#1e2428] ml-2 rounded-md text-white px-2 py-2 max-w-[40%] w-fit break-words `}
                                                        style={{top:toolTipPosition.top, left:toolTipPosition.left}}>
                                {lastMessage}
                        </div> 
                    }
                </div>
            </div>
            <MdOutlineDeleteSweep className="h-6 w-6 grow-0 shrink-0 ml-2" onClick={(e)=>{
                e.stopPropagation()
                setIsDeleteChatVisible(true)
            }}/>
        </div>
        
        {isDeleteChatVisisble?
            <PopUpForm>
                <ChatDeleteForm setIsDeleteChatVisible={setIsDeleteChatVisible} deleteChat={deleteChat}/>
            </PopUpForm>:null
        }
    </li>
    );
}
export default ChatPreview;