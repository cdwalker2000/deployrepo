import React,{ useState,useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'
// import { useNavigate } from 'react-router-dom';


// Panels
const Panel = ({children,title,className}) => {
    return (
        <div className={'bg-white rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
            <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
            {children}
        </div>
    )
}




const Manager = () => {
    // Main
    // Array of objects containing our protein data
    const protein = [
    
        { label: "vegetable medley", value: "vegetable medley", id: 1 },
        { label: "chicken", value: "chicken", id: 2 },
        { label: "gyro", value: "gyro", id: 3 },
        { label: "meatballs", value: "meatballs", id: 4 },
        { label: "falafel", value: "falafel", id: 5 }

    ]

    // Array of objects containing our protein data
    const menuItems = [
        { label: "pickled onions", value: "pickled onions", id: 1 },
        { label: "diced cucumbers", value: "diced cucumbers", id: 2 },
        { label: "citrus couscous", value: "citrus couscous", id: 3 },
        { label: "roasted cauliflower", value: "roasted cauliflower", id: 4 },
        { label: "tomato-onion salad", value: "tomato-onion salad", id: 5 },
        { label: "kalamata olives", value: "kalamata olives", id: 6 },
        { label: "roasted peppers", value: "roasted peppers", id: 7 },
        { label: "red cabbage slaw", value: "red cabbage slaw", id: 8 },
        { label: "hummus", value: "hummus", id: 9 },
        { label: "red pepper hummus", value: "red pepper hummus", id: 10 },
        { label: "jalapeno feta", value: "jalapeno feta", id: 11 },
        { label: "tzatziki", value: "tzatziki", id: 12 },
        { label: "greek vinaigrette", value: "greek vinaigrette", id: 13 },
        { label: "harissa", value: "harissa", id: 14 },

    ]
   
    let [proteins, setProtein] = useState("")

    let handleProteinChange = (e) => {
        setProtein(e.target.value)
    }

    let [menuItem, setMenuItem] = useState("")

    let handleMenuItemChange = (e) => {
        setMenuItem(e.target.value)
    }
                      
    {/*
    // navigation
    const navigate = useNavigate();
    // to report pages
    const toSalesReport = () => {
        navigate('/salesReport')
    }
    const toExcessReport = () => {
        navigate('/excessReport')
    }
    const toBestSellersReport = () => {
        navigate('/bestSellersReport')
    }
    const toRestockReport = () => {
        navigate('/restockReport')
    }
*/}

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
                                <Button >Generate Sales Report</Button>
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

            <div className="flex flex-col md:flex-row justify-between h-[700px] mt-[0px] pb-[0px] relative">
                <div className={'w-[50%] mr-[20px] h-full flex flex-col justify-between'}>

                    <Panel className="h-[48%]" title="Best Combo Report">
                        {/* Displaying the value of protein */}
                        {proteins}
                        <br />

                        {/* Creating our dropdown and passing it the handleFruitChange 
                        so that every time a new choice is selected, our fruit state 
                        updates and renders an emoji of the fruit.
                        */}
                        <select onChange={handleProteinChange}> 
                        <option value=""> -- Select a Protein -- </option>
                                {/* Mapping through each fruit object in our fruits array
                            and returning an option element with the appropriate attributes / values.
                            */}
                        {protein.map((proteins) => <option value={proteins.value}>{proteins.label}</option>)}
                        </select>

                        <br />
                        {/*Menu Item dropdown*/}
                        {menuItem}
                        <br />

                        <select onChange={handleMenuItemChange}> 
                        <option value=""> -- Select a Menu Item -- </option>
                                {/* Mapping through each fruit object in our fruits array
                            and returning an option element with the appropriate attributes / values.
                            */}
                        {menuItems.map((menuItem) => <option value={menuItem.value}>{menuItem.label}</option>)}
                        </select>
                        <Button>Generate Best Sellers Report</Button>
                            
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