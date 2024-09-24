import React , {createContext, type Dispatch } from "react";
import { v4 as uuid } from 'uuid';


export const CurrentConvoIdContext = createContext<ConversationId>(null)
export const DispatchCurrentConvoIdContext = createContext<Dispatch<React.SetStateAction<ConversationId>> | null>(null)

export const MyConversationsList = createContext<MyConversationsList>([]);
export const DispatchMyConversationsist =  createContext<Dispatch<ConversationListActions> | null>(null)

export const AllConversations = createContext<AllConversations>({})
export const DispatchAllConversations  = createContext<Dispatch<AllConversationsActions> | null>(null)


// Conversation List Reducer
type ConversationListActions = {type : "delete", conversationId:string|number} | {type:"add", name:string, profileImg?:string}

export function setMyConversationsList(state:MyConversationsList, action:ConversationListActions):MyConversationsList {
    switch (action.type){
        case 'delete':{
            const indexTodelete = state.findIndex(({conversationId})=>{
                return conversationId === action.conversationId
            })
            const newState  = [...state];
            newState.splice(indexTodelete,1);
            localStorage.setItem("myConversationsList",JSON.stringify(newState));
            return newState
        }
        case 'add':{
            let profileImg = action.profileImg;
            if(!profileImg || profileImg==="undefined")profileImg="https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE";
            let newState =  [...state, {
                conversationId : uuid() as NonNullable<ConversationId>,
                user:{
                    id:uuid(),
                    name:action.name,
                    profileImg:profileImg
                } as User
            }]
            localStorage.setItem("myConversationsList",JSON.stringify(newState));
            return newState
        }
        default:{
            throw new Error("No such action found in Conversation List")
        }
    }
}


// All Conversations Reducer
type AllConversationsActions = AddMessage | DeleteMessage | EditMessage

interface AddMessage{
    type:"add_message",
    conversationId:string|number, 
    msgText:string
}
interface DeleteMessage{
    type:"delete_message",
    conversationId:string|number, 
    msgId:string|number
}
interface EditMessage{
    type:"edit_message",
    conversationId:string|number, 
    msgId:string|number,
    msgText:string
}

export function setAllConversations (state:AllConversations , action:AllConversationsActions):AllConversations{
    const currentConvo = (action.conversationId in state)? state[action.conversationId] : [];
    const updatedCurrentConvo =  [...currentConvo]

    switch (action.type){
        case "add_message":{
            updatedCurrentConvo.push(
                {
                    id:uuid(),
                    text:action.msgText,
                    time:Date.now()
                }
            )
            const newState  = {
                ...state,
                [action.conversationId] : updatedCurrentConvo
            }
            localStorage.setItem("allConversations", JSON.stringify(newState));
            return newState;
        }
        case "delete_message":{
            const messageToDeleteIndex = currentConvo.findIndex((msg)=>{
                return msg.id === action.msgId;
            })
            updatedCurrentConvo.splice(messageToDeleteIndex,1);
            const newState  = {
                ...state,
                [action.conversationId] : updatedCurrentConvo
            }
            localStorage.setItem("allConversations", JSON.stringify(newState));
            return newState;
        }
        case "edit_message":{
            const messageToEditIndex = currentConvo.findIndex((msg)=>{
                return msg.id === action.msgId;
            })
            updatedCurrentConvo[messageToEditIndex] = {
                ...updatedCurrentConvo[messageToEditIndex],
                text:action.msgText
            } 
            const newState  = {
                ...state,
                [action.conversationId] : updatedCurrentConvo
            }
            localStorage.setItem("allConversations", JSON.stringify(newState));
            return newState;
        }
        default:{
            throw new Error ("No such action in All Conversations")
        }
    }
}