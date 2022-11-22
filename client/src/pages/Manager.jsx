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

    const [salesReport, setSalesReport] = useState([])
    const [excessReport, setExcessReport] = useState([])
    const [restockReport, setRestockReport] = useState([])
    const [comboReport, setComboReport] = useState([])

    const initialReportsInputs = {"s_start_date": "2022-09-12 00:00:00", "s_end_date": "2022-09-13 00:00:00", "e_start_date": "_", "c_category1": "_", "c_category2": "_"}
    const [reportInputs, setReportsInputs] = useState(initialReportsInputs)

    


    const getSalesReport = async (event) => {
        event.preventDefault();

        console.log("getSalesReport sends request");
        
        const result = await fetch(`http://localhost:8080/sales_report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportInputs),
        });
        result
            .json()
            .then(result => setSalesReport(result))
            .catch(e => console.log(e))

        
        console.log("getSalesReport gets response");
    }

    return (
        <>
            <div className="flex flex-col md:flex-row h-[600px] relative">
                <div className="absolute h-[70px] w-[70px] right-[10px] top-[-20px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={40} color="white"/>
                </div>
                {/* <div>
                    <TiUser style={{fontSize: '50px'}}/> <h1>Manager Name</h1>
                </div> */}
                <Panel title="Check Inventory" className="mr-[25px] relative w-full md:w-[500px] h-full flex flex-col items-between">
                        <div class="min-h-[60px] items-center flex w-full">
                        <Input label="Item Name"/>
                           
                        </div>
                        <Button className="mx-[5px]">Search</Button>
                </Panel>
                
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Enter New Employee">
                           
                                <Input label="New Employee Name"/>
                            
                                <Input label="Employee Username"/>
                                <Input label="Employee Password"/>
                                <Button >Add Server</Button>
                        </Panel>
                        <Panel className="h-[48%]" title="Add new Item">
                            <div className="mt-[20px]">
                                <Input label="New Item Name"/>
                                <Input label="New Item Price"/>
                            </div>
                            <div className="flex justify-between">
                                <Button type="danger">Remove Item</Button>
                                <Button>Add Item</Button>
                            </div>
                        </Panel>
                        
                        
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
                        <Panel className="h-[48%]" title="Restock Items">
                            <div>
                            <div className="mt-[20px]">
                                <Input label="Item Name"/>
                                <Input label="Quantity Restocked"/>
                            </div>
                                <Button>Restock</Button>
                            </div>
                        </Panel>
                </div>
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Sales Report">
                        <div>
                            <div className="mt-[20px]">
                                <Input label="Start Date"/>
                                <Input label="End Date"/>
                            </div>
                                <Button onClick={getSalesReport}>Generate Sales Report</Button>
                            </div>
                        </Panel>
                </div>
                <div className={'w-[50%] ml-[20px] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Excess Inventory Report">
                        <div>
                            <div className="mt-[20px]">
                                <Input label="Input Type of Dish"/>
                            </div>
                                <Button>Generate Excess Report</Button>
                            </div>
                        </Panel>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between h-[800px] mt-[0px] pb-[0px] relative">
                <div className={'w-[50%] mr-[20px] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Restock Items">
                            <div>
                            <div className="mt-[20px]">
                                <Input label="Item Name"/>
                                <Input label="Quantity Restocked"/>
                            </div>
                                <Button>Restock</Button>
                            </div>
                        </Panel>
                </div>
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Sales Report">
                        <div>
                            <div className="mt-[20px]">
                                <Input label="Start Date"/>
                                <Input label="End Date"/>
                            </div>
                                <Button>Generate Restock Report</Button>
                            </div>
                        </Panel>
                </div>
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Excess Inventory Report">
                        <div>
                            <div className="mt-[20px]">
                                <Input label="Input Type of Dish"/>
                            </div>
                                <Button>Generate Excess Report</Button>
                            </div>
                        </Panel>
                </div>
                <Button className="absolute bottom-0 right-0">Accessibility</Button>
            </div>
        </>
    )
}

export default Manager