import React,{useState} from 'react'
import defaultAvatar from '../assets/avatar.jpg'
import { useCustomContext } from '../Context/Provider'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

// profile image
const Avatar = ({uri}) => {
    return (
        <div className="w-[40px] overflow-hidden h-[40px] rounded-full">
            <img className="w-[40px] h-[40px]" src={uri}/>
        </div>
    )
}

// nav bar infomation
const NavBar = () => {
    const navigate = useNavigate();
    // user info include first and last name
    const [user,setUser] = useState({
        firstName: 'FirstName',
        lastName: 'LastName'
    })
    return (
        <div className="px-[50px] fixed left-0 top-0 h-[70px] z-[999] flex justify-between items-center w-full bg-white">
            <div className="flex items-center">
                <Avatar uri={defaultAvatar}/>
                <div className="font-bold text-gray-500 ml-[12px]">{ user.firstName }</div>
                <div className="font-bold text-gray-500 ml-[12px]">{ user.lastName }</div>
            </div>
            {/* <Button onClick={() => navigate('login')}>LOG IN</Button> */}
        </div>
    )
}

export default NavBar