import React from 'react'

// blocks for inputs
const Input = (props) => {

    const { label,value,onChange,type } = props;
    // get type in values
    const getTypeIn = () => {
        if(!type)
            return 'text'
        return type
    }
    return (
        <div className="flex mb-[12px] items-center h-[40px]">
            <p className="text-left mr-[7px] min-w-[120px]">{label}:</p>
            <input type={getTypeIn()} className="w-full outline-none h-full rounded-[5px] pl-[15px] border transition-all focus:border-blue-500 focus:shadow-md" value={value} onChange={onChange}/>
        </div>
    )
}

export default Input