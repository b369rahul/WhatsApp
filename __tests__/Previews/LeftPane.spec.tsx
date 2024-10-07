import { render, renderHook , screen, waitFor} from "@testing-library/react"
import LeftPane from "../../src/Previews/LeftPane"
import { DispatchMyConversationsist, CurrentConvoIdContext, setMyConversationsList, AllConversations, MyConversationsList } from "../../src/context";
import { useReducer } from "react";
import userEvent from "@testing-library/user-event";

const mockCurrentConvoId = "test-convo-id";
const testUserName = "testUserName"
describe('Testing left Pane',()=>{
    const {result} = renderHook(()=>useReducer(setMyConversationsList,[]))

    test('adding new user to the conversation',async()=>{
        const { getByLabelText} = render(
            <DispatchMyConversationsist.Provider value={result.current[1]}>
            <CurrentConvoIdContext.Provider value={mockCurrentConvoId}>
            <AllConversations.Provider value = {{}}>
            <MyConversationsList.Provider value={result.current[0]}>
            <LeftPane/>
            </MyConversationsList.Provider>
            </AllConversations.Provider>
            </CurrentConvoIdContext.Provider>
            </DispatchMyConversationsist.Provider>
        )

        const addNewConversationButton  =  getByLabelText("addNewUser")
        userEvent.click(addNewConversationButton)
        const nameInput  = await screen.findByPlaceholderText("Enter name");
        await userEvent.type(nameInput, testUserName);
        const submitButton = screen.getByRole("button",{name:"Add Chat"})
        userEvent.click(submitButton)
        waitFor(()=>{
            expect(screen.getByText(testUserName)).toBeInTheDocument()
        })
    })

})