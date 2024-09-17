import { useState } from "react";

interface AddNewChatFormProps {
    addNewChat: (name: string, profileImg?: string) => void,
    className?: string,
    setIsVisible:(arg:boolean)=>void,
}

export default function AddNewChatForm({ addNewChat, setIsVisible }: AddNewChatFormProps) {
    const [name, setName] = useState<string>('');
    const [profileImg, setProfileImg] = useState<string>('');

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        addNewChat(name, profileImg);
        setIsVisible(false);  
    }

    const handleClose = () => {
        setIsVisible(false); 
    }

    return (
            <form onSubmit={handleOnSubmit} className="z-10 space-y-4 flex flex-col border-2 border-[#2A3942] w-72 items-center rounded-lg p-4 bg-[#1F2C34] relative">
                <button 
                    type="button" 
                    onClick={handleClose} 
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-200">
                    &times;
                </button>

                <label className="block text-sm font-medium text-[#8696A0]">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full p-2 bg-[#2A3942] border-none rounded-md text-[#E9EDEF] focus:outline-none focus:ring-2 focus:ring-[#00A884]"
                    required
                />

                <label className="block text-sm font-medium text-[#8696A0]">Profile Image</label>
                <input
                    type="text"
                    value={profileImg}
                    onChange={(e) => setProfileImg(e.target.value)}
                    placeholder="Enter image URL"
                    className="w-full p-2 bg-[#2A3942] border-none rounded-md text-[#E9EDEF] focus:outline-none focus:ring-2 focus:ring-[#00A884]"
                />

                {profileImg && <img src={profileImg} alt="Profile Preview" className="h-16 w-16 rounded-full mt-2 object-cover border-2 border-[#00A884]" />}

                <button type="submit" className="w-full bg-[#00A884] text-white px-4 py-2  rounded-md hover:bg-[#025E51] focus:ring-2 focus:ring-[#00A884]">
                    Add Chat
                </button>
            </form>
    );
}
