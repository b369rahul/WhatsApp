import {getPersonById} from "./functions"
import { memo } from "react"

interface ChatProfileProps{
    className:string,
    currentPersonId:string|number,
}

const ChatProfile = memo( ({className=" ", currentPersonId}:ChatProfileProps) =>{

    const currentPerson : Person = getPersonById(currentPersonId)
    console.log("chatprof")
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