import React, { useState, useEffect } from 'react'
import Panel from '../components/Panel2'
import Button from '../components/Button'
import CheckInventory from '../components/CheckInventory'
import SearchMenu from '../components/SearchMenu'
import RegisterCustomer from '../components/RegisterServer'
import ChangeMenu from '../components/ChangeMenu'
import RecordRestock from '../components/RecordRestock'
import SalesReport from '../components/SalesReport'
import RestockReport from '../components/RestockReport'
import ExcessReport from '../components/ExcessReport'
import { HiOutlineVolumeUp } from 'react-icons/hi'
import {TiUser} from 'react-icons/ti'
import ComboReport from '../components/ComboReport'



const Manager = () => {

    return (
        <>
            <div className="flex flex-col md:flex-row h-[600px] relative">
                <div className="absolute h-[70px] w-[70px] right-[10px] top-[-20px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={40} color="white"/>
                </div>
                {/* <div>
                    <TiUser style={{fontSize: '50px'}}/> <h1>Manager Name</h1>
                </div> */}
                <CheckInventory />

                <SearchMenu />
                
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
                    <RegisterCustomer />
                    <ChangeMenu />
                </div>
                <div className={'w-[200px] h-full flex flex-col justify-between ml-[25px]'}>
                    <Panel className="h-[48%]" title="Sign Out">
                        <div className="flex justify-between">
                            <Button type="danger">Log Off</Button>
                        </div>
                    </Panel>
                </div>
              
            </div>
            <div className="flex flex-col md:flex-row justify-between h-[600px] mt-[50px] pb-[0px] relative">
                <div className={'w-[50%] mr-[20px] h-full flex flex-col justify-between'}>
                    <RecordRestock />
                </div>
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                    <SalesReport />
                </div>
                
                
                <div className={'w-[50%] ml-[20px] h-full flex flex-col justify-between'}>
                    <ExcessReport />
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between h-[800px] mt-[0px] pb-[0px] relative">
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                    <RestockReport />
                </div>
                <Button className="absolute bottom-0 right-0">Accessibility</Button>
            </div>

            <div className="flex flex-col md:flex-row justify-between h-[700px] mt-[0px] pb-[0px] relative">
                <div className={'w-[50%] mr-[20px] h-full flex flex-col justify-between'}>
                    <ComboReport />
                </div>
            </div>
        </>
    )
}

export default Manager