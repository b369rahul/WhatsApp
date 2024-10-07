import { useState, useContext } from "react";
import { DispatchMyConversationsist } from "../context";
interface AddNewChatFormProps {
    className?: string,
    setIsVisible:(arg:boolean)=>void,
}

export default function AddNewChatForm({ setIsVisible, className }: AddNewChatFormProps) {
    const [name, setName] = useState<string>('');
    const [profileImg, setProfileImg] = useState<string>('');
    
    const dispatchMyConversationsist = useContext(DispatchMyConversationsist)

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        dispatchMyConversationsist!({
            type:"add",
            name:name,
            profileImg:profileImg
        })
        setIsVisible(false);  
    }

    const handleClose = () => {
        setIsVisible(false); 
    }
    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==='Enter')e.preventDefault()
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    }
    return (
            <form onSubmit={handleOnSubmit} className={className}>

                <label className="block text-sm font-medium">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full p-2  border-none rounded-md  focus:outline-none focus:ring-2 focus:ring-[#00A884]"
                    onKeyDown={handleKeyDown}
                    required
                />

                <label className="block text-sm font-medium ">Profile Image</label>
                <input
                    type="text"
                    value={profileImg}
                    onChange={(e) => setProfileImg(e.target.value)}
                    placeholder="Enter image URL"
                    onKeyDown={handleKeyDown}
                    className="w-full p-2  border-none rounded-md  focus:outline-none focus:ring-2 focus:ring-[#00A884]"
                />

                {profileImg && <img src={profileImg} alt="Profile Preview" className="h-16 w-16 rounded-full mt-2 object-cover border-2 border-[#00A884]" />}

                <div className="flex justify-between w-full space-x-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="w-1/2 bg-gray-600  px-4 py-2 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-400">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={(e)=>e.stopPropagation()}
                        className="w-1/2 bg-orange-600  px-4 py-2 rounded-md hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400">
                        Add Chat
                    </button>
                </div>
            </form>
    );
}
