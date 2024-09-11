interface props{
    className?:any,
    person?:any
}
export default function ChatPreview({className,person}:props){
    return (
    <div className={"truncate flex items-center flex-row h-20 w-full border-b-[0.5px] pl-2 " + className}>
        <img src={person.profileImg} alt="User" className="rounded-full h-12 w-12 mr-5" />
        <h2>{person.name}</h2>
    </div>
    );
}