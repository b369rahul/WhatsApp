import SendMessage from "../../src/Conversation/SendMessage";
import { render } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import { DispatchAllConversations, CurrentConvoIdContext } from "../../src/context";

const mockDispatchAllConversations = jest.fn();
const mockCurrentConvoId = "test-convo-id";

const testValue="test";

describe("sending test message",()=>{

    test("should not able to send empty message",async()=>{
        const { getByRole} = render(
            <CurrentConvoIdContext.Provider value={mockCurrentConvoId}>
            <DispatchAllConversations.Provider value={mockDispatchAllConversations}>
                <SendMessage />
            </DispatchAllConversations.Provider>
            </CurrentConvoIdContext.Provider>
        )
        await userEvent.click(getByRole('button'))
        expect(mockDispatchAllConversations).not.toHaveBeenCalled();
    })

    test("able to write message", async ()=>{
        const {getByPlaceholderText} = render(
            <CurrentConvoIdContext.Provider value={mockCurrentConvoId}>
            <DispatchAllConversations.Provider value={mockDispatchAllConversations}>
                <SendMessage />
            </DispatchAllConversations.Provider>
            </CurrentConvoIdContext.Provider>
        )
        const  inputBox  = getByPlaceholderText("Type Message to send....") as HTMLInputElement;
        await userEvent.type(inputBox,testValue)
        expect(inputBox.value).toBe(testValue)
    })

    test("able to send message",async()=>{
        const {getByRole} = render(
            <CurrentConvoIdContext.Provider value={mockCurrentConvoId}> 
            <DispatchAllConversations.Provider value={mockDispatchAllConversations}>
                <SendMessage />
            </DispatchAllConversations.Provider>
            </CurrentConvoIdContext.Provider>
        )
        await userEvent.click(getByRole('button'))

        // Message is sent once only
        expect(mockDispatchAllConversations).toHaveBeenCalledTimes(1);


        // Message is sent with correct values
        expect(mockDispatchAllConversations).toHaveBeenCalledWith({
            type:"add_message",
            msgText:testValue,
            conversationId:mockCurrentConvoId!
        })
    })


})