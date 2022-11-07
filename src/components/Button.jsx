import React from 'react'

// buttons
const Button = (props) => {
    const { children,round,className,type,block,onClick } = props;
    // styles
    const baseClasses = () => {
        let extraClasses = '';
        switch(type) {
            case "primary": 
                extraClasses = 'bg-blue-500';
                break;
            case "danger": 
                extraClasses = 'bg-red-500';
                break;
            case "warning": 
                extraClasses = 'bg-yellow-500';
                break;
        } 
        if(block) {
            extraClasses += ' ' + 'w-full'
        }
        return ' ' + 'px-[15px] h-[40px] text-white hover:opacity-75 shadow-lg leading-[40px] text-center bg-blue-500 cursor-pointer ' + extraClasses
    }
    return (
        <div 
        onClick={onClick || (() => {})}
        className={`${round? 'rounded-full':'rounded-[4px]' + baseClasses() + ' ' + className } 
        `}>{children}</div>
    )
}

export default Button