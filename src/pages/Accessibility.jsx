
import React, { useState } from 'react'
import Input from '../components/Input'
import { Button, Modal,Card,Select } from 'antd';
import { HiOutlineVolumeUp } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';

const ColorTag = ({color}) => {
    return (
        <div className="w-[40px] h-[40px]" style={{background: color}}></div>
    )
}

const Accessibility = () => {
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();
    const colorList = ['black','blue','red','gray','green','orange']
    const toHome = () => {
        navigate('/')
    }
    return (
        <div className="w-[100vw] relative h-[100vh] flex items-center justify-around bg-gray-50">
            <div className="absolute h-[70px] top-[60px] w-[70px] right-[50px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                <HiOutlineVolumeUp size={30} color="white" />
            </div>
            <div className="w-[600px] h-[600px] rounded-[15px] bg-white py-[30px] px-[30px] shadow-lg">
                <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">Accessibility</p>
                <Card
                    title="Font setting"
                    extra={<a href="#">More</a>}
                    style={{
                        width: '100%',
                    }}
                >
                   <Input label="Font style"/>
                    <div className="flex items-center">
                        <div className="mr-[8px] min-w-[120px]">Color</div>
                        {colorList.map((item,index) => (<ColorTag key={index} color={item}/>))}
                    </div>
                </Card>
                <div className="mt-[20px]">
                    <Select
                        defaultValue={colorList[0]}
                        style={{
                        width: 200,
                        }}
                        options={colorList.map((color) => ({
                            label: color,
                            value: color,
                        }))}
                    />
                </div>
                <div className="flex justify-between mt-[20px]">
                    <Button type="danger" onClick={toHome}>Cancel</Button>
                    <Button type="primary" onClick={toHome}>Apply</Button>
                </div>
            </div>
        </div>
    )
}

export default Accessibility