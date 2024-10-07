import { useReducer, useState, lazy, Suspense} from 'react';
import { CurrentConvoIdContext, DispatchCurrentConvoIdContext} from './context';
import LeftPane from './Previews/LeftPane';
import { AllConversations, setAllConversations, DispatchAllConversations } from './context';
import { MyConversationsList,DispatchMyConversationsist, setMyConversationsList } from "./context";
import Loader from './Loader';
const Conversation = lazy(()=>import("./Conversation/Conversation"))

interface ChatAppProps{
    className?:string
}

export default function ChatApp({className=""}:ChatAppProps){

    const [currentConvoId, setCurrentConvoId] = useState<ConversationId>(null)
    const [allConversations, dispatchAllConversations] = useReducer(setAllConversations, JSON.parse(localStorage.getItem("allConversations") || "{}" ))
    const [myConversationsList, dispatchMyConversationsist] = useReducer(setMyConversationsList, JSON.parse(localStorage.getItem("myConversationsList") || "[]" ))
    return (

        <div className= {"flex flex-row "+ " " + className}>
            <DispatchMyConversationsist.Provider value = {dispatchMyConversationsist}>
            <MyConversationsList.Provider value = {myConversationsList}>
            <CurrentConvoIdContext.Provider value={currentConvoId}>
            <DispatchCurrentConvoIdContext.Provider value = {setCurrentConvoId}>
            <AllConversations.Provider value={allConversations}>
                    <LeftPane className="w-1/4 h-screen bg-[#cfece8] min-w-80 border-x-[#4590f0] border-l-2"/>
                    {currentConvoId ? 
                        <DispatchAllConversations.Provider value={dispatchAllConversations}>
                            <Suspense fallback = {<Loader className = "w-3/4 h-screen text-black "/>}>
                                <Conversation key={currentConvoId} className='w-3/4 h-screen bg-[#cfece8]' /> 
                            </Suspense>
                        </DispatchAllConversations.Provider>
                        : null
                    }
            </AllConversations.Provider>
            </DispatchCurrentConvoIdContext.Provider>
            </CurrentConvoIdContext.Provider>
            </MyConversationsList.Provider>
            </DispatchMyConversationsist.Provider>
        </div>
    );
}