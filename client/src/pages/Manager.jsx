import React,{ useState,useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'
import {TiUser} from 'react-icons/ti'
// import { addDish } from '../../../server/queries'

function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if (month.toString().length == 1) {
         month = '0' + month;
    }
    if (day.toString().length == 1) {
         day = '0' + day;
    }   
    if (hour.toString().length == 1) {
         hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
         minute = '0' + minute;
    }
    if (second.toString().length == 1) {
         second = '0' + second;
    }   
    var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;   
    console.log("Made datetime: " + dateTime)
    
    return dateTime;
}

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

    const initialCheckInventoryInput = {"check_ingredient_name": ""}
    const [checkInventoryInput, setCheckInventoryInput] = useState(initialCheckInventoryInput)
    const [inventory, setInventory] = useState([])

    const initialNewEmployee = {"new_fname": "", "new_lname": "", "new_username": "", "new_password": "", "new_role": "server"}
    const [newEmployee, setNewEmployee] = useState(initialNewEmployee)

    const initialDish = {"dish_name": "", "dish_price": ""}
    const [dish, setDish] = useState(initialDish)

    const initialRestock = {"time": "", "ingredient_name": "", "seller_name": "", "cost": "", "num_servings": ""}
    const [restock, setRestock] = useState(initialRestock)

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

    const handleInputChangeDish = event => {
        const { id, value } = event.target
        setDish({ ...dish, [id]: value })
    }

    const handleInputChangeRestock = event => {
        const { id, value } = event.target
        // console.log(id + ": " + value)
        setRestock({ ...restock, [id]: value })
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
        
        const response = await fetch(`http://localhost:8080/new_user`, {
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
            body: JSON.stringify(dish),
        });
        await fetch(`http://localhost:8080/add_new_inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dish),
        });

        setDish(initialDish);
        
        console.log("addDish gets responses");
    }

    const updateDish = async (event) => {
        event.preventDefault();

        console.log("updateDish sends request");
        
        await fetch(`http://localhost:8080/update_dish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dish),
        });

        setDish(initialDish);
        
        console.log("updateDish gets response");
    }

    const removeDish = async (event) => {
        event.preventDefault();

        console.log("removeDish sends request");
        
        await fetch(`http://localhost:8080/remove_dish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dish),
        });

        setDish(initialDish);
        
        console.log("removeDish gets response");
    }

    // const updateRestockTime = () => {
    //     setRestock({ ...restock, ["time"]: getDateTime() });
    // }

    const addRestockOrder = async (event) => {
        event.preventDefault();

        console.log("addRestockOrder sends requests");

        // updateRestockTime();
        
        await fetch(`http://localhost:8080/restock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restock),
        });

        await fetch(`http://localhost:8080/update_inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restock),
        });

        setRestock(initialRestock);
        
        console.log("addRestockOrder gets responses");
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
                            <Input id="check_ingredient_name" label="Item Name" handleInputChange={handleInputChangeCheckInventory} value={checkInventoryInput.check_ingredient_name}/>
                        </div>
                        <Button onClick={getInventory} className="mx-[5px]">Search</Button>
                </Panel>
                
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Enter New Employee">
                            <div className="mt-[20px]">
                                <Input id="new_fname" label="First Name" handleInputChange={handleInputChangeNewEmployee} value={newEmployee.new_fname}/>
                                <Input id="new_lname" label="Last Name" handleInputChange={handleInputChangeNewEmployee} value={newEmployee.new_lname}/>
                            
                                <Input id="new_username" label="Username" handleInputChange={handleInputChangeNewEmployee} value={newEmployee.new_username}/>
                                <Input id="new_password" type="password" label="Password" handleInputChange={handleInputChangeNewEmployee} value={newEmployee.new_password}/>
                            </div>
                            <div className="flex justify-between">
                                <Button onClick={addEmployee}>Add Server</Button>
                            </div>
                        </Panel>
                        <Panel className="h-[48%]" title="Menu Changes">
                            <div className="mt-[20px]">
                                <Input id="dish_name" label="Name" handleInputChange={handleInputChangeDish} value={dish.dish_name} />
                                <Input id="dish_price" label="Price" handleInputChange={handleInputChangeDish} value={dish.dish_price} />
                            </div>
                            <div className="flex justify-between">
                                <Button onClick={removeDish} type="danger">Remove Dish</Button>
                                <Button onClick={updateDish} type="warning">Update Price</Button>
                                <Button onClick={addDish}>Add Dish</Button>
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
                        <Panel className="h-[48%]" title="Restock Orders">
                            <div>
                            <div className="mt-[20px]">
                                <Input id="ingredient_name" label="Ingredient Name" handleInputChange={handleInputChangeRestock} value={restock.ingredient_name}/>
                                <Input id="num_servings" label="Quantity (servings)" handleInputChange={handleInputChangeRestock} value={restock.num_servings}/>
                                <Input id="cost" label="Cost" handleInputChange={handleInputChangeRestock} value={restock.cost}/>
                                <Input id="seller_name" label="Seller" handleInputChange={handleInputChangeRestock} value={restock.seller_name}/>
                                <Input id="time" label="Datetime Received" handleInputChange={handleInputChangeRestock} value={restock.time}/>
                            </div>
                                <Button onClick={addRestockOrder}>Record Restock Order</Button>
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
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Restock Report">
                        <div>
                            <Button onClick={getRestockReport}>Generate Restock Report</Button>
                        </div>
                        </Panel>
                </div>
                <Button className="absolute bottom-0 right-0">Accessibility</Button>
            </div>
        </>
    )
}

export default Manager