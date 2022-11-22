import React from 'react'

// buttons
const Dish = (props) => {
    const { dish_name, dish_price, onClick, round,className,type,block} = props;
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
            case "good":
                extraClasses = 'bg-green-500';
                break;
        } 
        if(block) {
            extraClasses += ' ' + 'w-full'
        }
        return ' ' + 'px-[15px] h-[40px] text-white hover:opacity-75 shadow-lg leading-[40px] text-center bg-blue-500 cursor-pointer ' + extraClasses
    }
    return (
        <div className="flex items-center justify-between mb-[12px]">
            <div className="w-[50px] h-[50px] rounded-[4px] overflow-hidden">
                {/* <img className="w-full h-full" src={menu} /> */}
            </div>
            <div className={`${round? 'rounded-full':'rounded-[4px]' + baseClasses() + ' ' + className }`}>
                <button onClick={onClick}>{dish_name}</button>
            </div>
            <span className="font-bold text-red-500">${dish_price}</span>
        </div>        
    )
}

export default Dish