import { useState } from "react";

interface MessageEditFormProps {
    setIsEditMessageVisible: (arg: boolean) => void,
    editMessage: (text: string) => void,
    lastMessage: string,
    className?:"string"   
}

export default function MessageEditForm({ setIsEditMessageVisible, editMessage, lastMessage, className }: MessageEditFormProps) {
    const [text, setText] = useState(lastMessage);

    const handleClose = () => {
        setIsEditMessageVisible(false); 
    }

    function handleOnSubmit(e: any) {
        e.preventDefault();
        editMessage(text);
        setIsEditMessageVisible(false);
    }

    return (
        <form onSubmit={handleOnSubmit} className={className}>

            <h2 className="text-xl text-white font-semibold">Edit Message</h2>

            <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-32 p-2 bg-[#2A3942] text-[#E9EDEF] border-none rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#00A884]"
                placeholder="Edit your message here..."
                rows={4}
            />


            <div className="flex justify-between w-full space-x-2">
                <button
                    type="button"
                    onClick={handleClose}
                    className="w-1/2 bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-600 focus:ring-2 focus:ring-red-400">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-1/2 bg-[#00A884] text-white px-4 py-2 rounded-md hover:bg-[#025E51] focus:ring-2 focus:ring-[#00A884]">
                    Save
                </button>
            </div>
        </form>
    );
}
