import React,{ useState,useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'

//Order items
const OrderItem = ({price,name}) => {
    const baseClasses = 'flex rounded-[7px] justify-between shadow-md h-[50px] bg-gray-50 mb-[7px] transition-all hover:bg-gray-200 items-center px-[20px]'
    return (
        <div className={baseClasses}>
            <span>{name}</span>
            <span>{price}</span>
        </div>
    )
}

// Panels
const Panel = ({children,title,className}) => {
    return (
        <div className={'bg-gray-500 rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
            <p className="mb-[10px] pb-[12px] border-gray-900 border-b-1 text-left text-xl font-bold text-amber-300">{title}</p>
            {children}
        </div>
    )
}

// Main
const Home = () => {
    // order list
    const [order,setOrder] = useState([
        {name: 'test order',price: '$100.8'},
    ])
    // order displaying
    const initMockList = () => {
        const mock = Array.from(new Array(20)).map((_,index) => ({name: `order ${index}`,price: `$${Math.round(Math.random() * 50 + 10)}`}))
        setOrder(mock)
    }
    useEffect(() => {
        initMockList()
    },[])
    return (
        <>
            <div className="flex flex-col md:flex-row h-[600px] relative space-x-4">
                <div className="absolute h-[70px] w-[70px] right-[10px] top-[-20px] rounded-full flex items-center justify-around bg-pink-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={40} color="white"/>
                </div>
                <Panel title="Current Order" className="mr-[25px] relative w-full md:w-[500px] h-full flex flex-col items-between">
                    <div className="h-full px-[10px] overflow-auto">
                            {order.map((item,index) => (
                                <OrderItem {...item} key={index} />
                            ))}
                        </div>
                        <div class="min-h-[60px] items-center flex w-full">
                            <Button className="mx-[5px]" type ="good">Add Order</Button>
                            <Button className="mx-[5px]" type="danger">Delete</Button>
                            <Button className="mx-[5px]" type="danger">Cancel</Button>
                            <Button className="mx-[5px]" type ="good">Confirm</Button>
                        </div>
                </Panel>
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="User Settings">
                            <div className="flex justify-between">
                                <Button>Change Password</Button>
                                <Button type="danger">Log Off</Button>
                            </div>
                            <div className="mt-[20px]">
                                <Input label="Username"/>
                                <Input type="password" label="Old Password"/>
                                <Input type="password" label="New Password"/>
                            </div>
                        </Panel>
                </div>
                <div className={'w-[350px] h-[300px] flex flex-col  justify-between'}>
                        <Panel className="h-[48%]" title="WELCOME: ##CUSTOMER NAME GOES HERE##">
                            <div className="flex justify-between">
                            </div>
                        </Panel>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between h-[800px] mt-[50px] pb-[50px] relative">
                <div className={'w-[50%] mr-[20px] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Main">
                        </Panel>
                        <Panel className="h-[48%]" title="Starter">
                        </Panel>
                </div>
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Protein">
                        </Panel>
                        <div className={'w-full h-[48%] mr-[20px] flex justify-between relative'}>
                            <Panel className="w-[48%] h-full" title="Topings">
                            </Panel>
                            <Panel className="w-[48%] h-full" title="Sauces">
                            </Panel>
                        </div>
                </div>
                <Button className="absolute bottom-0 right-0">View Order</Button>
            </div>
        </>
    )
}

export default Home