import SearchBar from "../../src/Previews/SearchBar";
import { fireEvent, render } from '@testing-library/react';

describe("Contacts search bar",()=>{

    test("check if placeholder is empty",()=>{
        const {getByPlaceholderText} = render(<SearchBar/>)
        const  inputBox  = getByPlaceholderText("Search ....") as HTMLInputElement;
        expect(inputBox.value).toBe("")
    })

    test("search value is changable",()=>{
        const {getByPlaceholderText} = render(<SearchBar/>)
        const  inputBox  = getByPlaceholderText("Search ....") as HTMLInputElement;
        const testValue="test";
        fireEvent.change(inputBox, {target:{value:testValue}})
        expect(inputBox.value).toBe(testValue)
    })
})
