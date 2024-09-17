import { Children } from "react";

interface PopUpFormProps {
    className?: string,
    children:React.ReactNode
}

export default function PopUpForm({className = '', children}: PopUpFormProps) {

    return (
        <div className={"z-10 w-screen h-screen fixed top-0 left-0 flex justify-center items-center " + className}>
            <div className="z-2 absolute w-full h-full bg-[#075E54] bg-opacity-50"></div>
            {Children.map(children, child =>
                <div>
                    {child}
                </div>
            )}
            
        </div>
    );
}
