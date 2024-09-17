interface MessageDeleteFormProps {
    setIsDeleteMessageVisible: (arg: boolean) => void, 
    deleteMessage: () => void
}

export default function MessageDeleteForm({ setIsDeleteMessageVisible, deleteMessage }: MessageDeleteFormProps) {
    const handleClose = () => {
        setIsDeleteMessageVisible(false); 
    }

    function handleOnSubmit(e: any) {
        e.preventDefault();
        deleteMessage();
        setIsDeleteMessageVisible(false);
    }

    return (
        <form onSubmit={handleOnSubmit} className="z-10 space-y-6 flex flex-col border-2 border-[#2A3942] w-80 items-center rounded-lg p-6 bg-[#1F2C34] relative shadow-lg">

            <h2 className="text-xl text-white font-semibold">Delete Message</h2>

            <p className="text-[#E9EDEF] text-center">
                Are you sure you want to delete this message? This action cannot be undone.
            </p>

            <div className="flex justify-between w-full space-x-4">
                <button
                    type="button"
                    onClick={handleClose}
                    className="w-1/2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-400">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-1/2 bg-yellow-900 text-white px-4 py-2 rounded-md hover:bg-yellow-800 focus:ring-2 focus:ring-red-400">
                    Delete
                </button>
            </div>
        </form>
    );
}
