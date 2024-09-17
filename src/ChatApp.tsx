import Previews from './Previews';
import Conversation from './Conversation';
import { useState} from 'react';
import {getConnections} from "./functions"


interface ChatAppProps{
    className:string
}

export default function ChatApp({className}:ChatAppProps){
    const [currentPersonId, setCurrentPersonId]=useState<number|string | null>(null);
    const [connections,setConnections]=useState(getConnections())
    return (
        <div className= {"flex flex-row "+ " " + className}>
            <Previews setCurrentPersonId={setCurrentPersonId} connections={connections} setConnections={setConnections} className="w-1/4 h-screen bg-[#075E54] min-w-40"/>
            {currentPersonId ? 
                <Conversation key={currentPersonId} currentPersonId={currentPersonId} connections={connections} setConnections={setConnections} className='w-3/4 h-screen bg-opacity-95 ' /> : null
            }
        </div>
    );
}