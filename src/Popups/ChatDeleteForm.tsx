interface ChatDeleteFormProps {
    setIsDeleteChatVisible: (arg: boolean) => void,
    deleteChat: () => void,
    className? : string
}

export default function ChatDeleteForm({ setIsDeleteChatVisible, deleteChat, className }: ChatDeleteFormProps) {
    const handleClose = (e:any) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDeleteChatVisible(false);
    }

    function handleOnSubmit(e: any) {
        e.preventDefault()
        e.stopPropagation()
        setIsDeleteChatVisible(false);
        deleteChat();
    }

    return (
        <form onSubmit={handleOnSubmit} className={className}>

            <h2 className="text-xl text-white font-semibold">
                Are You Sure To Delete This Conversation.
                Action Cannot be Undone
            </h2>

            <div className="flex justify-between w-full space-x-4">
                <button
                    type="button"
                    onClick={handleClose}
                    className="w-1/2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-400">
                    Cancel
                </button>
                <button
                    type="submit"
                    onClick={(e)=>e.stopPropagation()}
                    className="w-1/2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-400">
                    Delete
                </button>
            </div>
        </form>
    );
}
