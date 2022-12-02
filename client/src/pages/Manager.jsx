import React,{ useState,useEffect } from 'react'
import Panel from '../components/Panel2'
import Input from '../components/Input'
import Button from '../components/Button'
import Inventory from '../components/Inventory'
import Menu from '../components/Menu'
import Report from '../components/Report'
import SalesReport from '../components/SalesReport'
import ReportEntries from '../components/ReportEntries'
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

// Main
const Manager = () => {

    const initialCheckInventoryInput = {"check_ingredient_name": ""}
    const [checkInventoryInput, setCheckInventoryInput] = useState(initialCheckInventoryInput)
    const [inventory, setInventory] = useState([])

    const initialMenuSearchInput = {"menu_search_term": ""}
    const [menuSearchInput, setMenuSearchInput] = useState(initialMenuSearchInput)
    const [menu, setMenu] = useState([])

    const initialNewEmployee = {"new_fname": "", "new_lname": "", "new_username": "", "new_password": "", "new_role": "server"}
    const [newEmployee, setNewEmployee] = useState(initialNewEmployee)

    const initialDish = {"dish_name": "", "dish_price": ""}
    const [dish, setDish] = useState(initialDish)

    const initialRestock = {"time": "", "ingredient_name": "", "seller_name": "", "cost": "", "num_servings": ""}
    const [restock, setRestock] = useState(initialRestock)

    const initialReportsInputs = {"s_start_date": "", "s_end_date": "", "e_start_date": "_", "c_category1": "_", "c_category2": "_"}
    const [reportInputs, setReportsInputs] = useState(initialReportsInputs)

    const [salesReport, setSalesReport] = useState([])
    const [excessReport, setExcessReport] = useState([])
    const [restockReport, setRestockReport] = useState([])
    const [comboReport, setComboReport] = useState([])

    // var comboReport = []


    

    
    const handleInputChangeCheckInventory = event => {
        const { id, value } = event.target
        setCheckInventoryInput({ ...checkInventoryInput, [id]: value })
    }

    const handleInputChangeMenuSearch = event => {
        const { id, value } = event.target
        setMenuSearchInput({ ...menuSearchInput, [id]: value })
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

    const getMenu = async (event) => {
        event.preventDefault();

        console.log("getMenu sends request");
        
        const response = await fetch(`http://localhost:8080/menu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menuSearchInput),
        });
        response
            .json()
            .then(response => setMenu(response))
            .catch(e => console.log(e))
        
        console.log("getMenu gets response");
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

        if (reportInputs.s_start_date == "") {
            reportInputs.s_start_date = "2022-09-11 00:00:00";
        }

        if (reportInputs.s_end_date == "") {
            reportInputs.s_end_date = getDateTime();
        }
        
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

    const getExcessReport = async (event) => {
        console.log("getExcessReport sends requests");        

        const response = await fetch(`http://localhost:8080/ingredients`)
        response
            .json()
            .then(response => processIngredients(response))
            .catch(e => console.log(e))
        
        console.log("getExcessReport gets responses");
    }

    const processIngredients = (ingredients) => {
        ingredients.forEach(ingredient => {
            if (ingredient.category == 'topping' || ingredient.category == 'protein' || ingredient.category == 'sauce') {
                getSales(ingredient);
            }
        });
    }

    const getSales = async (ingredient) => {
        if (ingredient.category == "topping") {
            getSales1(ingredient);
        }

        if (ingredient.category == 'protein') {
            const response = await fetch(`http://localhost:8080/sales_protein`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ingredient),
            });
            response
                .json()
                .then((response) => compareSalesStock(response[0].count, ingredient))
                .catch(e => console.log(e))
        }

        if (ingredient.category == 'sauce') {
            const response = await fetch(`http://localhost:8080/sales_sauce`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ingredient),
            });
            response
                .json()
                .then((response) => compareSalesStock(response[0].count, ingredient))
                .catch(e => console.log(e))
        }
    }

    //

    const getSales1 = async (ingredient) => {
        const response = await fetch(`http://localhost:8080/sales_ingr1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        response
            .json()
            .then((response) => getSales2(response[0].count, ingredient))
            .catch(e => console.log(e))
    }

    //

    const getSales2 = async (sales, ingredient) => {
        const response = await fetch(`http://localhost:8080/sales_ingr2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        response
            .json()
            .then((response) => getSales3(sales + response[0].count, ingredient))
            .catch(e => console.log(e))
    }

    //

    const getSales3 = async (sales, ingredient) => {
        const response = await fetch(`http://localhost:8080/sales_ingr3`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        response
            .json()
            .then((response) => getSales4(sales + response[0].count, ingredient))
            .catch(e => console.log(e))
    }

    //

    const getSales4 = async (sales, ingredient) => {
        const response = await fetch(`http://localhost:8080/sales_ingr4`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        response
            .json()
            .then((response) => compareSalesStock(sales + response[0].count, ingredient))
            .catch(e => console.log(e))
    }

    // currStock = initialStock - sales + restocks
    // initialStock = currStock + sales - restocks 

    const compareSalesStock = async (sales, ingredient) => {
        ingredient.start_date = reportInputs.e_start_date;
        
        const response = await fetch(`http://localhost:8080/stock_at_start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        
        response
            .json()
            .then((response => isExcess(response[0].sum, sales, ingredient)))
    }

    const isExcess = (restocks, sales, ingredient) => {
        let initialStock = 0
        if (restocks === null) {
            initialStock = ingredient.stock + sales;
        }
        else {
            initialStock = ingredient.stock + sales - restocks;
        }
        
        if (sales < 0.10 * initialStock) {
            console.log(ingredient.ingredient_name + " " + initialStock)
            let percent = sales / initialStock * 100;
            console.log("Sold " + percent.toFixed(3) + "%")
            ingredient.sold = percent.toFixed(3) + "%"
            excessReport.push(ingredient)
            setExcessReport([...excessReport])
        }
    }

    //

    const getBestSellingComboReport = async (event) => {
        let url = "";
        switch (reportInputs.c_category1) {
            case "protein":
                url = `http://localhost:8080/proteins`;
                break;
            case "topping":
                url = `http://localhost:8080/toppings`;
                break;
            case "sauce":
                url = `http://localhost:8080/sauces`;
                break;
        }
        const result = await fetch(url)      // change to final deployment site
        result
            .json()
            .then(result => getCategory2Entries(result))
            .catch(e => console.log(e))
    }

    const getCategory2Entries = async (c1Entries) => {
        let url = "";
        switch (reportInputs.c_category2) {
            case "protein":
                url = `http://localhost:8080/proteins`;
                break;
            case "topping":
                url = `http://localhost:8080/toppings`;
                break;
            case "sauce":
                url = `http://localhost:8080/sauces`;
                break;
        }
        const result = await fetch(url)      // change to final deployment site
        result
            .json()
            .then(result => calcComboSales(c1Entries, result))
            .catch(e => console.log(e))
    }

    const calcComboSales = async (c1Entries, c2Entries) => {


        for (let i = 0; i < c1Entries.length; i++) {
            for (let j = 0; j < c2Entries.length; j++) {
                let c1Entry = c1Entries[i].ingredient_name
                let c2Entry = c2Entries[j].ingredient_name
                let c1Condition = makeCondition(reportInputs.c_category1, c1Entry)
                let c2Condition = makeCondition(reportInputs.c_category2, c2Entry)
                let input = {"c1Condition" : c1Condition, "c2Condition" : c2Condition}
                const response = await fetch(`http://localhost:8080/combo_sales`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(input),
                });
                response
                    .json()
                    // .then((response) => setComboReport([...response[0].sales]))
                    .then((response) => {
                        let reportEntry = {"c1Entry" : c1Entry, "c2Entry" : c2Entry, "sales" : response[0].sales}
                        comboReport.push(reportEntry)
                    })
                    .catch(e => console.log(e))
            }
        }
        setComboReport([...comboReport])
        
        sortComboReport()
    }

    const makeCondition = (category, cEntry) => {
        switch (category) {
            case "protein":
                return "(protein_name = '" + cEntry + "')"
            case "topping":
                return "(ingr1_name = '" + cEntry + "' OR ingr2_name = '" + cEntry + "' OR ingr3_name = '" + cEntry + "' OR ingr4_name = '" + cEntry + "')"
            case "sauce":
                return "(sauce_name = '" + cEntry + "')"
        }
        
    }

    const sortComboReport = () => {
        comboReport.sort( (entry1, entry2) => 
            entry2.sales - entry1.sales
        )
        console.log(comboReport)
        setComboReport([...comboReport])
        
    }

    const categories = [
        { name: "protein" },
        { name: "topping" },
        { name: "sauce" },
    ]
    

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
                    <div>    
                        <div className="min-h-[60px] items-center flex w-full">
                            <Input id="check_ingredient_name" label="Item Name" handleInputChange={handleInputChangeCheckInventory} value={checkInventoryInput.check_ingredient_name}/>
                        </div>
                        <Button onClick={getInventory} className="mx-[5px]">Search</Button>
                    </div>
                    <Inventory data={inventory}/>
                </Panel>

                <Panel title="Menu" className="mr-[25px] relative w-full md:w-[500px] h-full flex flex-col items-between">
                    <div>    
                        <div className="min-h-[60px] items-center flex w-full">
                            <Input id="menu_search_term" label="Dish Name" handleInputChange={handleInputChangeMenuSearch} value={menuSearchInput.menu_search_term}/>
                        </div>
                        <Button onClick={getMenu} className="mx-[5px]">Search</Button>
                    </div>
                    <Menu data={menu}/>
                </Panel>
                
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
                        <Panel className="h-[48%]" title="Register New Server">
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
                {/* <SalesReport /> */}
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                    <Panel className="h-[48%]" title="Sales Report">
                        <div>
                            <div className="mt-[20px]">
                                <Input id="s_start_date" label="Start Date" handleInputChange={handleInputChangeReports} value={reportInputs.s_start_date}/>
                                <Input id="s_end_date" label="End Date" handleInputChange={handleInputChangeReports} value={reportInputs.s_end_date}/>
                            </div>
                            <Button onClick={getSalesReport}>Generate Sales Report</Button>
                        </div>
                        <ReportEntries data={salesReport} type="sales" />
                    </Panel>
                </div>
                <div className={'w-[50%] ml-[20px] h-full flex flex-col justify-between'}>
                    <Panel className="h-[48%]" title="Excess Inventory Report">
                        <div>
                            <div className="mt-[20px]">
                                <Input id="e_start_date" label="Input Type of Dish" handleInputChange={handleInputChangeReports} value={reportInputs.e_start_date}/>
                            </div>
                            <Button onClick={getExcessReport}>Generate Excess Report</Button>
                        </div>
                        <ReportEntries data={excessReport} type="excess" />  
                    </Panel>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between h-[800px] mt-[0px] pb-[0px] relative">
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                    <Panel className="h-[48%]" title="Restock Report">
                        <div>
                            <Button onClick={getRestockReport}>Generate Restock Report</Button>
                        </div>
                        <ReportEntries data={restockReport} type="restock" />  
                    </Panel>
                </div>
                <Button className="absolute bottom-0 right-0">Accessibility</Button>
            </div>

            <div className="flex flex-col md:flex-row justify-between h-[700px] mt-[0px] pb-[0px] relative">
                <div className={'w-[50%] mr-[20px] h-full flex flex-col justify-between'}>

                    <Panel className="h-[48%]" title="Best Combo Report">
                        {/* Displaying the value of protein */}
                        {/* {category} */}
                        <br />

                        {/* Creating our dropdown and passing it the handleInputChangeReports 
                        so that every time a new choice is selected, our report inputs state updates.
                        */}
                        <select id="c_category1" onChange={handleInputChangeReports} value={reportInputs.c_category1}> 
                            <option defaultValue={"-- Select a Category --"}>-- Select a Category --</option>
                                    {/* Mapping through each fruit object in our fruits array
                                and returning an option element with the appropriate attributes / values.
                                */}
                            {categories.map((category) => <option key={category.name} value={category.name}>{category.name}</option>)}
                        </select>

                        <br />
                        <br />
                        <br />

                        {/* Creating our dropdown and passing it the handleInputChangeReports 
                        so that every time a new choice is selected, our report inputs state updates.
                        */}
                        <select id="c_category2" onChange={handleInputChangeReports} value={reportInputs.c_category2}> 
                            <option defaultValue={"-- Select a Category --"}>-- Select a Category --</option>
                                    {/* Mapping through each fruit object in our fruits array
                                and returning an option element with the appropriate attributes / values.
                                */}
                            {categories.map((category) => <option key={category.name} value={category.name}>{category.name}</option>)}
                        </select>
                        
                        <br />
                        <br />
                        <br />
                        
                        <Button onClick = {getBestSellingComboReport}>Generate Best Sellers Report</Button>
                        
                        <ReportEntries data={comboReport} type="combo" />
                    </Panel>
                </div>
            </div>
        </>
    )
}

export default Manager