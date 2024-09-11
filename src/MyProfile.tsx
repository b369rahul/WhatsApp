const srcUrl="https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE";
import { CiChat1 } from "react-icons/ci";
import { MdOutlineCircleNotifications } from "react-icons/md";


export default function MyProfile(){
    return (
        <div className="sticky top-0 z-10 truncate flex justify-between items-center flex-row h-20 w-full pr-5 pl-2 border-b-[0.5px] grow-0 shrink-0 bg-[#2a2f32]">
            <img src={srcUrl} alt="User" className="rounded-full h-12 w-12 mr-5" />
            <div className="flex flex-row h-full items-center">
                <MdOutlineCircleNotifications className="h-6 w-6 m-2 "/>
                <CiChat1 className="h-6 w-6 m-2 " />
                <MdOutlineCircleNotifications className="h-6 w-6 m-2 "/>
                <CiChat1 className="h-6 w-6 m-2 " />
            </div>
        </div>
    );
}