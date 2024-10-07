import { DispatchAllConversations, CurrentConvoIdContext, setAllConversations, AllConversations } from "../../src/context";
import { useReducer } from "react";
import AllMessage from "../../src/Conversation/AllMessage";
import SendMessage from "../../src/Conversation/SendMessage";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import {render, renderHook, act, screen, waitFor } from "@testing-library/react";

const mockCurrentConvoId = "test-convo-id";
const testValue="This is a tests message test";

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("sent message visible on screen", ()=>{

    test("message sent visible on screen",async ()=>{
        
        const{result} = renderHook(()=> useReducer(setAllConversations,{}))
        const [_, dispatchAllConversations] =  result.current

        const {rerender}  =   render(
                <AllConversations.Provider value={result.current[0]}>
                <CurrentConvoIdContext.Provider value={mockCurrentConvoId}>
                <DispatchAllConversations.Provider value={dispatchAllConversations}>
                        <AllMessage/>
                        <SendMessage/>
                </DispatchAllConversations.Provider>
                </CurrentConvoIdContext.Provider>
                </AllConversations.Provider>
            )
        const  inputBox  = screen.getByPlaceholderText("Type Message to send....") as HTMLInputElement;    
        await userEvent.type(inputBox,testValue)
        
        act(()=>{
            inputBox.dispatchEvent(new Event('submit', {'bubbles':true}))
        })

        rerender(
            <AllConversations.Provider value={result.current[0]}>
                <CurrentConvoIdContext.Provider value={mockCurrentConvoId}>
                <DispatchAllConversations.Provider value={dispatchAllConversations}>
                        <AllMessage/>
                        <SendMessage/>
                </DispatchAllConversations.Provider>
                </CurrentConvoIdContext.Provider>
                </AllConversations.Provider>
        )

        await waitFor(()=>{
            expect(screen.getByText(testValue)).toBeInTheDocument()
        })
    })

})  