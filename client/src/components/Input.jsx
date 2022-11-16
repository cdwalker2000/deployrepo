import React,{useState} from 'react'


// blocks take inputs from users
const Input = (props) => {
    const { label, value, onChange, type } = props;
    const [visible,setVisible] = useState(true);
    // take the inputs, for type such if it is text, it will show the inputs
    const getType = () => {
        if(!type)
            return 'text'
        return type
    }

    const baseClasses = () => {
        return 'w-full outline-none h-full rounded-[5px] pl-[15px] border transition-all focus:border-blue-500 focus:shadow-md'
    }
    return (
        <div className="flex mb-[12px] items-center h-[40px] relative">
            <p className="text-left mr-[7px] min-w-[120px]">{label}:</p>
            <input type={type} className={baseClasses()} value={value} onChange={e => onChange(e)}/>
            {/* <input type={visible? 'text': 'password'} className={baseClasses()} value={value} onChange={e => onChange(e)}/> */}
            {/* {getType() == 'password' &&  <div className="absolute right-[10px] top-[50%] translate-y-[-50%]" onClick={() => setVisible(!visible)}>
                { visible? <HiEye size={20} color="gray"/>: <HiEyeOff size={20} color="gray"/> }
            </div>} */}
        </div>
    )
}

export default Input