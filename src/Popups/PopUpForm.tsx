import React, { Children, useEffect, useRef } from "react";

interface PopUpFormProps {
    className?: string,
    children:React.ReactNode
}

export default function PopUpForm({className = '', children}: PopUpFormProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(ref.current==null)return;

        const element:HTMLElement = ref.current
        const focusableEls = element.querySelectorAll<HTMLElement>('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])')
        // const firstFocusableEl = focusableEls[0];  
        // const lastFocusableEl = focusableEls[focusableEls.length - 1];
        let i=-1;
        function handleFocusShift (e:any){
            if (e.key !== 'Tab') { 
                return; 
            }
            e.preventDefault()

            if ( e.shiftKey ){      /* shift + tab */ 
                // if (document.activeElement === firstFocusableEl) {
                //     lastFocusableEl.focus();
                //     e.preventDefault();
                // }
                i--;
                if(i<0)i=focusableEls.length-1;
                focusableEls[i].focus();
            } 
            else{      /* tab */ 

                // if (document.activeElement === lastFocusableEl) {
                //     firstFocusableEl.focus();
                //     e.preventDefault();
                // }
                i=(i+1)%(focusableEls.length)
                focusableEls[i].focus();
            }
        }

        window.addEventListener('keydown', handleFocusShift);

        return ()=>{
            window.removeEventListener('keydown',handleFocusShift)
        }

    },[])

    const formatedChild =()=>{
        let val = Children.map(children, child => {
                return React.cloneElement(
                    child as JSX.Element, 
                    {className:"z-10 space-y-4 flex flex-col border-2 border-[#2A3942] w-80 items-center rounded-lg p-6 bg-[#1F2C34] relative shadow-lg"}
                )
        })
        return val? val : <>{null}</>
    }
    
    return (
        <div className={"z-10 w-screen h-screen fixed top-0 left-0 flex justify-center items-center " + className}>
            <div className="z-2 absolute w-full h-full bg-[#075E54] bg-opacity-50"></div>
            <div ref={ref}>
                {formatedChild()}
            </div>
        </div>
    );
}
