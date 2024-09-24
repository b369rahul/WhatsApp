interface User{
    id:any;
    profileImg:string;
    name:string;
}
interface Message{
    id:number|string;
    text:string;
    time:number;
}

interface AllConversations{
    [id: string|number] : Array<Message>
}

type ConversationId = number|string|null;
type UserId = number|string;

type MyConversationsList = Array<{conversationId:NonNullable<ConversationId>, user:User}>