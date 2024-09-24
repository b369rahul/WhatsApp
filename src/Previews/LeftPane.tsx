import AddConversation from "./AddConversation";
import MyProfile from "./MyProfile";
import ConversationList from "./ConversationList";

interface LeftPaneProps{
    className:string;
}
export default function LeftPane({className}:LeftPaneProps){

    return (
        <div className={`flex flex-col ${className}`}>
            <MyProfile className="sticky top-0 z-10 bg-[#2a2f32] h-20 w-full pr-5 pl-2 border-b-[0.5px]">
                <AddConversation/>
            </MyProfile>
            <ConversationList/>
        </div>
    );
}