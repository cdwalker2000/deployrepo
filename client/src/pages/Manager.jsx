import React,{ useState,useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'
import {TiUser} from 'react-icons/ti'
// import { addDish } from '../../../server/queries'


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

    const initialCheckInventoryInput = {"ingredient_name": ""}
    const [checkInventoryInput, setCheckInventoryInput] = useState(initialCheckInventoryInput)
    const [inventory, setInventory] = useState([])

    const initialNewEmployee = {"new_fname": "", "new_lname": "", "new_username": "", "new_password": ""}
    const [newEmployee, setNewEmployee] = useState(initialNewEmployee)

    const initialNewDish = {"new_dish_name": "", "new_dish_price": ""}
    const [newDish, setNewDish] = useState(initialNewDish)

    const [salesReport, setSalesReport] = useState([])
    const [excessReport, setExcessReport] = useState([])
    const [restockReport, setRestockReport] = useState([])
    const [comboReport, setComboReport] = useState([])

    const initialReportsInputs = {"s_start_date": "", "s_end_date": "", "e_start_date": "_", "c_category1": "_", "c_category2": "_"}
    const [reportInputs, setReportsInputs] = useState(initialReportsInputs)

    
    const handleInputChangeCheckInventory = event => {
        const { id, value } = event.target
        setCheckInventoryInput({ ...checkInventoryInput, [id]: value })
    }

    const handleInputChangeNewEmployee = event => {
        const { id, value } = event.target
        setNewEmployee({ ...newEmployee, [id]: value })
    }

    const handleInputChangeNewDish = event => {
        const { id, value } = event.target
        setNewDish({ ...newDish, [id]: value })
    }
    
    const handleInputChangeReports = event => {
        const { id, value } = event.target
        setReportsInputs({ ...reportInputs, [id]: value })
    }

    

    const getInventory = async (event) => {
        event.preventDefault();

        console.log("getInventory sends request");
        
        const response = await fetch(`http://localhost:8080/inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkInventoryInput),
        });
        response
            .json()
            .then(response => setInventory(response))
            .catch(e => console.log(e))
        
        console.log("getInventory gets response");
    }

    const addEmployee = async (event) => {
        event.preventDefault();

        console.log("addEmployee sends request");
        
        const response = await fetch(`http://localhost:8080/new_server`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEmployee),
        });

        setNewEmployee(initialNewEmployee);
        
        console.log("addEmployee gets response");
    }

    const addDish = async (event) => {
        event.preventDefault();

        console.log("addDish sends requests");
        
        await fetch(`http://localhost:8080/add_new_dish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDish),
        });
        await fetch(`http://localhost:8080/add_new_inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDish),
        });

        setNewDish(initialNewDish);
        
        console.log("addDish gets responses");
    }

    const getSalesReport = async (event) => {
        event.preventDefault();

        console.log("getSalesReport sends request");
        
        const response = await fetch(`http://localhost:8080/sales_report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportInputs),
        });
        response
            .json()
            .then(response => setSalesReport(response))
            .catch(e => console.log(e))

        console.log("getSalesReport gets response");
    }

    const getRestockReport = async (event) => {
        console.log("getRestockReport sends request");
        
        const response = await fetch(`http://localhost:8080/restock_report`)
        response
            .json()
            .then(response => setRestockReport(response))
            .catch(e => console.log(e))

        console.log("getRestockReport gets response");
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
                        <div className="min-h-[60px] items-center flex w-full">
                            <Input id="ingredient_name" label="Item Name" handleInputChange={handleInputChangeCheckInventory} value={checkInventoryInput.ingredient_name}/>
                        </div>
                        <Button onClick={getInventory} className="mx-[5px]">Search</Button>
                </Panel>
                
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Enter New Employee">
                           
                                <Input id="new_fname" label="First Name" handleInputChange={handleInputChangeNewEmployee} value={newEmployee.new_fname}/>
                                <Input id="new_lname" label="Last Name" handleInputChange={handleInputChangeNewEmployee} value={newEmployee.new_lname}/>
                            
                                <Input id="new_username" label="Username" handleInputChange={handleInputChangeNewEmployee} value={newEmployee.new_username}/>
                                <Input id="new_password" type="password" label="Password" handleInputChange={handleInputChangeNewEmployee} value={newEmployee.new_password}/>
                                <Button onClick={addEmployee}>Add Server</Button>
                        </Panel>
                        <Panel className="h-[48%]" title="Add New Item">
                            <div className="mt-[20px]">
                                <Input id="new_dish_name" label="Name" handleInputChange={handleInputChangeNewDish} value={newDish.new_dish_name} />
                                <Input id="new_dish_price" label="Price" handleInputChange={handleInputChangeNewDish} value={newDish.new_dish_price} />
                            </div>
                            <div className="flex justify-between">
                                <Button type="danger">Remove Item</Button>
                                <Button onClick={addDish}>Add Item</Button>
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
                                <Input id="s_start_date" label="Start Date" handleInputChange={handleInputChangeReports} value={reportInputs.s_start_date}/>
                                <Input id="s_end_date" label="End Date" handleInputChange={handleInputChangeReports} value={reportInputs.s_end_date}/>
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
                        <Panel className="h-[48%]" title="Restock Report">
                        <div>
                            <Button onClick={getRestockReport}>Generate Restock Report</Button>
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