import {  useState} from "react";
import { IoIosPersonAdd } from "react-icons/io";
import AddNewChatForm from "../Popups/AddNewChatForm";
import PopUpForm from "../Popups/PopUpForm";


export default function AddConversation (){

    const [isVisible,setIsVisible]=useState<boolean>(false)

    return (
        <div className="relative flex flex-row h-full items-center">
                <IoIosPersonAdd className="h-6 w-6 m-2 hover:cursor-pointer" onClick={()=>setIsVisible(true)} aria-label="addNewUser"/>
                
                {isVisible && 
                    <PopUpForm>
                        <AddNewChatForm className="h-screen w-screen" setIsVisible={setIsVisible}/>
                    </PopUpForm>
                }
        </div>
    );
}