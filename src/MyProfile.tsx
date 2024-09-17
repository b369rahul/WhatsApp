const srcUrl="https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE";
import { useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import AddNewChatForm from "./AddNewChatForm";
import PopUpForm from "./PopUpForm";

interface MyProfileProps{
    className:string,
    addNewChat:(name:string, profileImg?:string)=>void
}

export default function MyProfile({className, addNewChat}:MyProfileProps){
    const [isVisible,setIsVisible]=useState<boolean>(false)
    return (
        <div className={"flex justify-between items-center flex-row grow-0 shrink-0 "+" " + className}>
            <img src={srcUrl} alt="User" className="rounded-full h-12 w-12 mr-5" />
            <div className="relative flex flex-row h-full items-center">
                <IoIosPersonAdd className="h-6 w-6 m-2 " onClick={()=>setIsVisible(true)}/>
                {isVisible && 
                    <PopUpForm>
                        <AddNewChatForm className="h-screen w-screen" addNewChat={addNewChat} setIsVisible={setIsVisible}/>
                    </PopUpForm>
                }
            </div>
        </div>
    );
}