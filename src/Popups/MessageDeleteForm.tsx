interface MessageDeleteFormProps {
    setIsDeleteMessageVisible: (arg: boolean) => void, 
    deleteMessage: () => void,
    className?:"string"
}

export default function MessageDeleteForm({ setIsDeleteMessageVisible, deleteMessage,className }: MessageDeleteFormProps) {
    const handleClose = () => {
        setIsDeleteMessageVisible(false); 
    }

    function handleOnSubmit(e: any) {
        e.preventDefault();
        deleteMessage();
        setIsDeleteMessageVisible(false);
    }

    return (
        <form onSubmit={handleOnSubmit} className={className}>

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
