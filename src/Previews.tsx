import SearchBar from "./SearchBar";
import MyProfile from "./MyProfile"
import ChatPreview from "./ChatPreview"
import { useState } from "react";

interface person{
    id:any;
    profileImg:string;
    name:string;
}
interface props{
    connections:person[],
    setCurrentPerson:(arg?:any)=>void;
}

export default function Previews({connections, setCurrentPerson}:props){
    const [searchText, setSearchText]=useState('');

    return (
        <div className="w-1/4 h-screen overflow-hidden relative flex flex-col bg-[#075E54] border-[0.5px]">
            <MyProfile/>
            <div className="z-5 overflow-scroll h-full mt-auto bg-[#1e2428]">
            <SearchBar searchText={searchText} setSearchText={setSearchText}/>
            <ul className="h-full">
            {
                connections.filter((person:person)=>{
                    return person.name.toLowerCase().includes(searchText.toLowerCase())
                }).map((person:person)=>{
                    return <li key={person.id} onClick={()=>setCurrentPerson(person)}> <ChatPreview key={person.id} person={person}/>  </li>
                })
            }
            </ul>
            </div>
        </div>
    );
}