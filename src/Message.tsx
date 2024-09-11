import { TiDelete } from "react-icons/ti";

interface Person {
    id: string | number,
    name: string,
    profileImg: string,
    messages?: any[]
}

interface Props {
    message: {
        id: string | number,
        text: string | number,
        time: string | number,
    },
    setConnections: (arg: any) => void,
    personId: string | number,
    connections: Person[],
    dateToShow:null|string
}

export default function Message({ message, personId, connections, setConnections ,dateToShow}: Props) {

    function deleteMessage(msgId: any) {
        const personToUpdateIndex = connections.findIndex((person) => person.id == personId);
        const updatedPerson = { ...connections[personToUpdateIndex] };
        const updatedConnections: Person[] = connections.map((person: Person) => {
            return { ...person };
        });

        const indexToDelete = updatedPerson.messages!.findIndex((msg: any) => msg.id == msgId);
        updatedPerson.messages!.splice(indexToDelete, 1);

        updatedConnections[personToUpdateIndex] = updatedPerson;
        setConnections(updatedConnections);
    }

    return (
            <>
                { dateToShow && <div className="self-center">
                        {dateToShow}
                </div>}
                <div key={message.id} className="bg-[#2e7d76] relative border-2 rounded-lg flex flex-col pl-2 pr-1 py-1 m-2 mr-2.5 min-w-16 max-w-fit message">
                    <button className="z-10 absolute -top-2.5 -right-0 hidden deleteMessage size-2" onClick={() => deleteMessage(message.id)}>
                        <TiDelete className="bg-gray-100 text-black rounded-lg" />
                    </button>
                    <p className="mb-4">{message.text}</p>
                    <p className="absolute bottom-0.5 right-0.5 text-xs">{new Date(message.time).toLocaleTimeString().slice(0, -3)}</p>
                </div>
            </>
    );
}
