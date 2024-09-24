import { memo,Children } from "react";

const srcUrl="https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE";


interface MyProfileProps{
    className:string,
    children:React.ReactNode
}

const MyProfile =  memo(({className, children}:MyProfileProps)=>{
    return (
        <div className={"flex justify-between items-center flex-row grow-0 shrink-0"+" " + className}>
            <div className="flex items-center">
                <img src={srcUrl} alt="User" className="rounded-full h-12 w-12 mr-5" />
                <h2> RB </h2>
            </div>
            {Children.map(children, child =>
                <>
                    {child}
                </>
            )}
        </div>
    );
})

export default MyProfile;