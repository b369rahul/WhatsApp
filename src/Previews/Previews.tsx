import SearchBar from "./SearchBar";
import MyProfile from "./MyProfile"
import ChatPreview from "./ChatPreview"
import { useCallback, useMemo, useState , useRef} from "react";
import {addNewConnection, deleteConversationById} from "../functions"


interface PreviewsProps{
    setCurrentPersonId:(arg:number|string)=>void;
    className:string;
    connections:Connections;
    setConnections:(arg:Connections)=>void
}


export default function Previews({setCurrentPersonId, className, connections, setConnections}:PreviewsProps){
    const [searchText, setSearchText]=useState('');
    const containerRef = useRef<HTMLDivElement | null>(null)


    const setCurrentPersonIdHandler = useCallback((id:number|string)=>{
        setCurrentPersonId(id)
    },[])

    const deleteCurrentPersonHandler = useCallback(( id:number|string)=>{
        const newConnections  = deleteConversationById(id);
        setConnections({...newConnections})
    },[])

    const addNewChat = useCallback((name:string, profileImg?:string)=>{
        const {newConnections, id} = addNewConnection(name, profileImg);
        setConnections({...newConnections})
        setCurrentPersonId(id)
    },[])

    const filteredConnections = useMemo(()=>{
        return Object.values(connections).filter((person:Person)=>{
            return person.name.toLowerCase().includes(searchText.toLowerCase())
        })
    },[searchText,connections])

    return (
        <div className={"relative flex flex-col " + className} style={{boxShadow: "0 0 2px 0"}}>
        <MyProfile className="sticky top-0 z-10 bg-[#2a2f32] h-20 w-full pr-5 pl-2 border-b-[0.5px]" addNewChat={addNewChat}/>

    <div ref={containerRef} className="z-5 overflow-y-auto h-full bg-[#1e2428]">
        <SearchBar searchText={searchText} setSearchText={setSearchText} className="w-full p-4 border-b-[0.5px] border-[#242d32]"/>

        <ul className="divide-y divide-[#242d32]">
            {filteredConnections.map((person: Person) => (
                <ChatPreview 
                    key={person.id} 
                    currentPersonId={person.id}
                    setCurrentPersonIdHandler={setCurrentPersonIdHandler}
                    deleteCurrentPersonHandler={deleteCurrentPersonHandler}
                    lastMessage={person.messages[person.messages.length-1]?.text}
                    className="hover:bg-[#303b42] transition-colors duration-200 w-full" 
                    containerRef={containerRef}
                />
            ))}
        </ul>
    </div>
</div>

    );
}