import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'
import NavBar from '../components/NavBar'
import { useCustomContext } from '../Context/Provider'
import { useNavigate } from 'react-router-dom'
import menu from '../assets/menu.webp'
import Mains from '../components/Server/Mains'
import Starters from '../components/Server/Starters'
import Proteins from '../components/Server/Proteins'
import Toppings from '../components/Server/Toppings'
import Sauces from '../components/Server/Sauces'
import Cart from '../components/Server/Cart'
import ChangePassword from '../components/ChangePassword'
import { message } from 'antd';



// the order item
const OrderItem = ({ price, name }) => {
    const baseClasses = 'flex rounded-[7px] justify-between shadow-md h-[50px] bg-gray-50 mb-[7px] transition-all hover:bg-gray-200 items-center px-[20px]'
    return (
        <div className={baseClasses}>
            <span>{name}</span>
            <span>{price}</span>
        </div>
    )
}

// panel
const Panel = ({ children, title, className }) => {
    return (
        <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
            <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
            {children}
        </div>
    )
}

// the page include display info
const Home = () => {
    const navigate = useNavigate();
    const { size,color } = useCustomContext();
    
    // current order display for temp
    const menuList = [
        {
            name: 'pita',
            children: ["falafel", "diced cucumbers", "tomato-onion salad", "roasted cauliflower", "roasted peppers", "tzatziki", "No Drink",],
            price: 7.69
        },
        {
            name: 'salad',
            children: ["falafel", "diced cucumbers", "tomato-onion salad", "roasted cauliflower", "roasted peppers", "tzatziki", "No Drink",],
            price: 7.69
        }
    ]
    
    const { user, handleChange } = useCustomContext();
    // store order and price
    const [order, setOrder] = useState([
        //{ name: 'test order', price: '$100.8' },
    ])

    // navigate to Server page
    const toServer = () => {
        navigate('/server')
    }

    // get the total
    const getTotal = () => {
        let sum = 0;
        sum = menuList.reduce((cur,item) => {
            return cur + item.price
        },0)
        // keep two digits
        return sum.toFixed(2);
    }
    // initialize the order list, with the array, can be changed to array read from database
    const initMockList = () => {
        // create order list with random price
        const mock = Array.from(new Array(20)).map((_, index) => ({ name: `order ${index}`, price: `$${Math.round(Math.random() * 50 + 10)}` }))
        setOrder(mock)
    }
    useEffect(() => {
        initMockList()
    }, [])

    const initialCurrentDish = {"dishname": "", "proteinname": "", "ingr1name": "", "ingr2name": "", "ingr3name": "", "ingr4name": "", "saucename": "", "have_drink": -1, "total_cost": -1.11}
    const [currentDish, setCurrentDish] = useState(initialCurrentDish)

    const [ingrCount, setIngrCount] = useState(0)


    const addIngredient = (item, category) => {
        let colname = "";
        let canAddIngredient = true;
        if (category == "protein") {
            colname = "protein_name";
            message.success('Protein Added');
        }
        if (category == "topping") {
            if (ingrCount < 4) {
                colname = "ingr" + (ingrCount+1) + "_name";
                setIngrCount(ingrCount + 1);
                message.success('Topping Added');
            }
            else {
                canAddIngredient =  false;
            }
        }
        if (category == "sauce") {
            colname = "sauce_name";
            message.success('Sauce Added');
        }
        if (canAddIngredient) {
            console.log(colname);
            setCurrentDish({ ...currentDish, [colname]: item.ingredient_name });
        }
        else {
            console.log("Can't add ingredient");
        }
    }

    return (

        <div style={{color: color,fontSize: size}}>
            <NavBar />
            <div className="flex flex-col md:flex-row h-[600px] relative mt-[90px] px-[50px]">
                <div className="absolute h-[70px] w-[70px] right-[50px] top-[0px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={30} color="white" />
                </div>
                { /*
                buttons functions:
                Cancel: delete everything in the cart which clear out the cart
                Delete: delete the current item or current order only in the cart, for example there is already one order
                in the cart and working on second order, Delete button will delete the second order keep the first order, 
                more like delete the current row in cart on database
                Add Order: add an order to the cart, more like create a new row in the cart in database
                Confirm: confirm the order and which push everything in the cart, update the order history and inventory
                then clear out the cart
                */}
                {/* <Panel title="Current Order & Check Out" className="mr-[25px] relative w-full md:w-[500px] h-full flex flex-col items-between">
                    <div className="h-full px-[10px] overflow-auto">
                        {menuList.map((item, index) => (
                            <div className="mb-[20px]">
                                <div className="flex font-bold text-xl justify-between items-center">
                                    <span>{item.name}</span>
                                    <span className="text-red-500">${item.price}</span>
                                </div>
                                <div className="text-right mt-[12px]">
                                    {item.children && item.children.map((citem, index) => (
                                        <div className="text-left" key={index}>{citem}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="flex font-bold text-xl justify-between items-center">
                            <span>Total</span>
                            <span className="text-red-500">${getTotal()}</span>
                        </div>
                    </div>
                    <div class="min-h-[60px] items-center flex w-full">
                        <Button className="mx-[5px]">Cancel</Button>
                        <Button className="mx-[5px]">Delete</Button>
                        <Button className="mx-[5px]">Add Order</Button>
                        <Button className="mx-[5px]">Confirm</Button>
                    </div>
                </Panel> */}
                <Cart currentDish={currentDish} setCurrentDish={setCurrentDish} initialCurrentDish={initialCurrentDish} setIngrCount={setIngrCount} />
                <div className={'w-[800px] h-full flex flex-col justify-between'}>
                    {/* <Panel className="h-[100%]" title="User Settings">
                        <div className="flex justify-between">
                            <Button>Change Password</Button>
                            <Button type="danger">Log Off</Button>
                        </div>
                        <div className="mt-[20px]">
                            <Input label="Username" />
                            <Input type="password" label="Old Password" />
                            <Input type="password" label="New Password" />
                        </div>
                    </Panel> */}
                    <ChangePassword/>
                </div>
            </div>
            <div className="flex flex-col px-[50px] md:flex-row justify-between h-[800px] mt-[50px] pb-[50px] relative">
                <div className={'w-[50%] mr-[20px] h-full flex flex-col justify-between'}>
                    
                    <Mains currentDish={currentDish} setCurrentDish={setCurrentDish}/>
                    
                    <Starters currentDish={currentDish} setCurrentDish={setCurrentDish} />
                </div>
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                    {/* <Panel className="h-[48%]" title="Protein">
                        {
                            protein.map((item, index) => (
                                <div key={index} className="flex items-center justify-between mb-[12px]">
                                    <div className="w-[50px] h-[50px] rounded-[4px] overflow-hidden">
                                        <img className="w-full h-full" src={menu} />
                                    </div>
                                    <Button key={index}>{item}</Button>
                                </div>
                            ))
                        }
                    </Panel> */}
                    <Proteins addIngredient={addIngredient} />
                    <div className={'w-full h-[48%] mr-[20px] flex justify-between relative'}>
                        {/* <Panel className="w-[48%] h-full" title="Topings">
                            {
                                toppings.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between mb-[12px]">
                                        <div className="w-[50px] h-[50px] rounded-[4px] overflow-hidden">
                                            <img className="w-full h-full" src={menu} />
                                        </div>
                                        <Button key={index}>{item}</Button>
                                    </div>
                                ))
                            }
                        </Panel> */}
                        <Toppings addIngredient={addIngredient} />
                        {/* <Panel className="w-[48%] h-full" title="Sauces">
                            {
                                sauces.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between mb-[12px]">
                                        <div className="w-[50px] h-[50px] rounded-[4px] overflow-hidden">
                                            <img className="w-full h-full" src={menu} />
                                        </div>
                                        <Button key={index}>{item}</Button>
                                    </div>
                                ))
                            }
                        </Panel> */}
                        <Sauces addIngredient={addIngredient} />
                    </div>
                </div>
                <Button className="absolute bottom-[10px] right-[10px]" onClick={toServer}>View Order</Button>
            </div>
        </div>
    )
}

export default Home