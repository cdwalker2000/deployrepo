import React,{useState} from 'react'
import Input from '../components/Input'
import { Button, Modal,Input as AInput } from 'antd';
import {UserOutlined,LockOutlined} from  '@ant-design/icons';
import {HiOutlineVolumeUp} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'

const Login = () => {
    // visibility of the pop window
    const [visible,setVisible] = useState(false)
    // initial username and password
    const [user,setUser] = useState({
        username: '',
        password: ''
    })

    // change the value for name
    const handleChange = (v,name) => {
        setUser(prev => ({...prev,[name]: v}))
    }

    // navigation
    const navigate = useNavigate();
    // back to home page
    const toHome = () => {
        navigate('/')
    }
    return (
        <div className="w-[100vw] relative h-[100vh] flex items-center justify-around bg-gray-200">
            <div className="absolute h-[70px] top-[60px] w-[70px] right-[50px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={30} color="white" />
                </div>
            <div className="w-[450px] rounded-[4px] bg-white py-[50px] px-[50px] shadow-lg">
                    <img src={logo}/>
                    <br/>
                    <br/>
                <AInput value={user.username} onChange={e => handleChange(e.target.value,'username')} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                <br/>
                <br/>
                <AInput
                value={user.password} onChange={e => handleChange(e.target.value,'password')}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
                <br/>
                <br/>
                <Button block type="primary">Login</Button>
                <br/>
                <br/>
                <div className="flex items-center justify-between">
                    <Button onClick={toHome} type="danger">Cancel</Button>
                    <Button type="primary" onClick={() => setVisible(true)}>Sign Up</Button>
                </div>
                <div className="flex items-center mt-[20px]"><span>Login with</span> <span className="cursor-pointer text-red-500 ml-[10px]">Google</span></div>
            </div>
            <Modal onOk={() => setVisible(false)} onCancel={() => setVisible(false)} visible={visible} title="Register New Customer">
                <div className="mt-[20px]">
                    <Input label="First Name" />
                    <Input label="Last Name"/>
                    <Input label="Username" />
                    <Input type="password" label="Password" />
                </div>
                <div className="flex justify-between">
                    <Button>Cancel</Button>
                    <Button type="danger">Register</Button>
                </div>
            </Modal>
        </div>
    )
}

export default Login