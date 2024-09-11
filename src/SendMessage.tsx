import { RiAttachment2 } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';


interface Person{
    id:string|number,
    name:string,
    profileImg:string,
    messages?:any[]
}

interface props{
    connections:Person[],
    personId:string|number,
    setConnections:(arg:any)=>void
}

export default function SendMessage({connections, personId, setConnections}:props){
    const [text,setText]=useState('')
    useEffect(()=>{                                                                 //???????
        setText(sessionStorage.getItem(`${personId}-draftMessage`) || "")
    },[personId])

    function sendMessage(e:any){
        e.preventDefault();
        if(text=='')return;
        
        const personToUpdateIndex = connections.findIndex((person)=>person.id==personId);
        const updatedPerson = Object.assign({},connections[personToUpdateIndex]);
        const updatedConnections:Person[]= connections.map((person:Person)=>{
            return Object.assign({},person)
        })
        if(!updatedPerson.messages)updatedPerson.messages=[];
        updatedPerson.messages.push({id:uuid(),text:text, time:Date.now()})
        
        updatedConnections[personToUpdateIndex]=updatedPerson
        setConnections(updatedConnections)
        setText('');
        sessionStorage.setItem(`${personId}-draftMessage`,'')
    }

    function onChangeHandler(e:any){
        setText(e.target.value);
        sessionStorage.setItem(`${personId}-draftMessage`,e.target.value)
    }

    return (
        <div className="flex flex-row items-center h-20 w-full justify-self-end border-t-[0.5px] bg-black z-10 grow-0 shrink-0">
            <RiAttachment2 className="w-8 h-8 mx-2"/>
            <form className="w-full h-10 flex flex-row" onSubmit={sendMessage}>
                <input placeholder="Type Message to send...." value={text} className="w-full pl-2 rounded-lg h-10" onChange={onChangeHandler}/>
                <button type="submit">
                    <IoMdSend className="w-8 h-8 mx-2"/>
                </button>
            </form>
        </div>
    );
}