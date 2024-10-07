import AddConversation from "./AddConversation";
import MyProfile from "./MyProfile";
import ConversationList from "./ConversationList";
import SearchBar from "./SearchBar";

interface LeftPaneProps{
    className?:string;
}
export default function LeftPane({className=""}:LeftPaneProps){

    return (
        <div className={`flex flex-col ${className}`}>
            <MyProfile className="sticky top-0 z-10 bg-[#4590f0] h-20 w-full pr-5 pl-2 border-b-[0.5px]">
                <AddConversation/>
            </MyProfile>
            <SearchBar className="z-5 overflow-y-auto h-full bg-[#6dfdff]">
                <ConversationList />
            </SearchBar>
        </div>
    );
}