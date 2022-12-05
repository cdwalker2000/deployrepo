import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'
import NavBar from '../components/NavBar'
import { useCustomContext } from '../Context/Provider'
import { useNavigate } from 'react-router-dom'
import menu from '../assets/menu.webp'


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
    const protein = ["vegetable medley", "chicken", "gyro", "meatballs", "falafel"]
    const toppings = ["pickled onions", "diced cucumbers", "citrus couscous", "roasted cauliflower", "tomato-onion salad", "kalamata olives", "roasted peppers", "red cabbage slaw"]
    const sauces = ["hummus", "red pepper hummus", "jalapeno feta", "tzatziki", "greek vinaigrette", "harissa"]
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
    // main data list
    const mainList =
        [
            { name: "grain bowl", price: '7.79' },
            { name: "salad", price: '7.69' },
            { name: "greens and grains", price: '7.69' },
            { name: "combo with drink", price: '8.99' },
            { name: "combo with fries and drink", price: '8.99' },
            { name: "pita", price: '7.69' }
    ]
    const { user, handleChange } = useCustomContext();
    // store order and price
    const [order, setOrder] = useState([
        { name: 'test order', price: '$100.8' },
    ])

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
                <Panel title="Current Order & Check Out" className="mr-[25px] relative w-full md:w-[500px] h-full flex flex-col items-between">
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
                </Panel>
                <div className={'w-[800px] h-full flex flex-col justify-between'}>
                    <Panel className="h-[48%]" title="User Settings">
                        <div className="flex justify-between">
                            <Button>Change Password</Button>
                            <Button type="danger">Log Off</Button>
                        </div>
                        <div className="mt-[20px]">
                            <Input label="Username" />
                            <Input type="password" label="Old Password" />
                            <Input type="password" label="New Password" />
                        </div>
                    </Panel>
                    <Panel className="h-[48%]" title="Register New Customer">
                        <div className="mt-[20px]">
                            <Input value={user.firstName} onChange={e => handleChange(e.target.value, 'firstName')} label="First Name" />
                            <Input value={user.lastName} onChange={e => handleChange(e.target.value, 'lastName')} label="Last Name" />
                            <Input label="Username" />
                            <Input type="password" label="Password" />
                        </div>
                        <div className="flex justify-between">
                            <Button>Cancel</Button>
                            <Button type="danger">Register</Button>
                        </div>
                    </Panel>
                </div>
            </div>
            <div className="flex flex-col px-[50px] md:flex-row justify-between h-[800px] mt-[50px] pb-[50px] relative">
                <div className={'w-[50%] mr-[20px] h-full flex flex-col justify-between'}>
                    <Panel className="h-[48%]" title="Main">
                        {mainList.map((item, index) => (
                            <div key={index} className="flex items-center justify-between mb-[12px]">
                                <div className="w-[50px] h-[50px] rounded-[4px] overflow-hidden">
                                    <img className="w-full h-full" src={menu} />
                                </div>
                                <Button>{item.name}</Button>
                                <span className="font-bold text-red-500">${item.price}</span>
                            </div>
                        ))}
                    </Panel>
                    <Panel className="h-[48%]" title="Starter">
                        {mainList.map((item, index) => (
                            <div key={index} className="flex items-center justify-between mb-[12px]">
                                <div className="w-[50px] h-[50px] rounded-[4px] overflow-hidden">
                                    <img className="w-full h-full" src={menu} />
                                </div>
                                <Button>{item.name}</Button>
                                <span className="font-bold text-red-500">${item.price}</span>
                            </div>
                        ))}
                    </Panel>
                </div>
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                    <Panel className="h-[48%]" title="Protein">
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
                    </Panel>
                    <div className={'w-full h-[48%] mr-[20px] flex justify-between relative'}>
                        <Panel className="w-[48%] h-full" title="Topings">
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
                        </Panel>
                        <Panel className="w-[48%] h-full" title="Sauces">
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
                        </Panel>
                    </div>
                </div>
                <Button className="absolute bottom-0 right-0">View Order</Button>
            </div>
        </div>
    )
}

export default Home