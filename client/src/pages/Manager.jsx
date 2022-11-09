import React,{ useState,useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'
import {TiUser} from 'react-icons/ti'


// Panels
const Panel = ({children,title,className}) => {
    return (
        <div className={'bg-white rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
            <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
            {children}
        </div>
    )
}

// Main
const Manager = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row h-[600px] relative">
                <div className="absolute h-[70px] w-[70px] right-[10px] top-[-20px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={40} color="white"/>
                </div>
                <div>
                    <TiUser style={{fontSize: '50px'}}/> <h1>Manager Name</h1>
                </div>
                <Panel title="Check Inventory" className="mr-[25px] relative w-full md:w-[500px] h-full flex flex-col items-between">
                        <div class="min-h-[60px] items-center flex w-full">
                            <Input label="Item"/>
                            <Button className="mx-[5px]">Search</Button>
                        </div>
                </Panel>
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Sign Out">
                            <div className="flex justify-between">
                                <Button type="danger">Log Off</Button>
                            </div>
                        </Panel>
                        <Panel className="h-[48%]" title="Add new Item">
                            <div className="mt-[20px]">
                                <Input label="Item"/>
                                <Input label="Price"/>
                            </div>
                            <div className="flex justify-between">
                                <Button>Cancel</Button>
                                <Button type="danger">Add</Button>
                            </div>
                        </Panel>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between h-[800px] mt-[50px] pb-[50px] relative">
                <div className={'w-[50%] mr-[20px] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Restock Items">
                            <div>
                                <Button>Restock</Button>
                            </div>
                        </Panel>
                </div>
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Sales Report">
                        </Panel>
                </div>
                <Button className="absolute bottom-0 right-0">Accessibility</Button>
            </div>
        </>
    )
}

export default Manager