import Previews from './Previews';
import Conversation from './Conversation';
import './main.css'
import './index.css'
import { useState} from 'react';
import {CONNECTIONS} from "./constant/connections"

interface Person{
  id:string|number,
  name:string,
  profileImg:string,
  messages?:any[]
}

function App() {
  const [currentPerson, setCurrentPerson]=useState<null | Person>(null);
  const [connections, setConnections] = useState<Person[]>(CONNECTIONS)

  return (
    <div className ="flex flex-row p-.5 w-screen h-screen overflow-hidden  bg-[#1e2428]">
    <Previews connections={connections} setCurrentPerson={setCurrentPerson} />
    {currentPerson && <Conversation connections={connections} personId={currentPerson.id} setConnections={setConnections}/>}
    </div>
  );
}

export default App;
