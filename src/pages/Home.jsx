import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'
import NavBar from '../components/NavBar'
import { useCustomContext } from '../Context/Provider'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png';
import menu from '../assets/menu.webp'
import { Modal } from 'antd';


// order items
const OrderItem = ({ price, name }) => {
    const baseClasses = 'flex rounded-[7px] justify-between shadow-md h-[50px] bg-gray-50 mb-[7px] transition-all hover:bg-gray-200 items-center px-[20px]'
    return (
        <div className={baseClasses}>
            <span>{name}</span>
            <span>{price}</span>
        </div>
    )
}

// panels
const Panel = ({ children, title, className }) => {
    return (
        <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
            <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
            {children}
        </div>
    )
}

// the home page for landing
const Home = () => {
    const navigate = useNavigate();
    const protein = ["vegetable medley", "chicken", "gyro", "meatballs", "falafel"]
    const toppings = ["pickled onions", "diced cucumbers", "citrus couscous", "roasted cauliflower", "tomato-onion salad", "kalamata olives", "roasted peppers", "red cabbage slaw"]
    const sauces = ["hummus", "red pepper hummus", "jalapeno feta", "tzatziki", "greek vinaigrette", "harissa"]
    // current order for display
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
    const mainList =
        [
            { name: "grain bowl", price: '7.79' },
            { name: "salad", price: '7.69' },
            { name: "greens and grains", price: '7.69' },
            { name: "combo with drink", price: '8.99' },
            { name: "combo with fries and drink", price: '8.99' },
            { name: "pita", price: '7.69' }
    ]
    const [visible,setVisible] = useState(false);
    const { user, handleChange } = useCustomContext();
    // temp test order
    const [order, setOrder] = useState([
        { name: 'test order', price: '$100.8' },
    ])

    // get the total parice
    const getTotal = () => {
        let sum = 0;
        sum = menuList.reduce((cur,item) => {
            return cur + item.price
        },0)
        // use two digits
        return sum.toFixed(2);
    }
    // initial display for temp use
    const initMockList = () => {
        const mock = Array.from(new Array(20)).map((_, index) => ({ name: `order ${index}`, price: `$${Math.round(Math.random() * 50 + 10)}` }))
        setOrder(mock)
    }
    useEffect(() => {
        initMockList()
    }, [])
    return (
        <>
            <div className="pt-[30px] px-[50px]">
                <img  className="h-[200px]" src={logo} />
            </div>
            <div className="flex flex-col md:flex-row h-[600px] relative mt-[30px] px-[50px]">
                <div className="absolute h-[70px] w-[70px] right-[50px] top-[0px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={30} color="white" />
                </div>
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
                    <Panel className="h-[100%]" title="Menu">
                        <p>Main List</p>
                        {mainList.map((item, index) => (
                            <div key={index} className="flex items-center justify-between mb-[12px]">
                                <Button onClick={() => setVisible(true)}>{item.name}</Button>
                                <span className="font-bold text-red-500">${item.price}</span>
                            </div>
                        ))}
                        <p>Starter</p>
                        {mainList.map((item, index) => (
                            <div key={index} className="flex items-center justify-between mb-[12px]">
                                <Button onClick={() => setVisible(true)}>{item.name}</Button>
                                <span className="font-bold text-red-500">${item.price}</span>
                            </div>
                        ))}
                    </Panel>
                </div>
                <Panel title="Current Order/Check Out" className="mr-[25px] relative w-full md:w-[500px] h-full flex flex-col items-between">
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
            </div>
            <div class="flex px-[50px] mt-[20px]">
                <div style={{'margin-right': '20px'}}>
                    <Button onClick={() => navigate('/server')}>Home</Button>
                </div>
                <div style={{'margin-right': '20px'}}>
                    <Button onClick={() => navigate('/login')}>Login</Button>
                </div>
                <div style={{'margin-right': '20px'}}>
                    <Button onClick={() => navigate('/acc')}>Accessibility</Button>
                </div>
                <div style={{'margin-right': '20px'}}>
                    <Button onClick={() => navigate('/acc')}>Google Map</Button>
                </div>
            </div>
            <Modal onOk={() => setVisible(false)} onCancel={() => setVisible(false)} visible={visible} title="Register New Customer">
                        <p>Toppings</p>
                        {mainList.map((item, index) => (
                            <div key={index} className="flex items-center justify-around mb-[12px]">
                                <Button onClick={() => setVisible(true)}>{item.name}</Button>
                            </div>
                        ))}
                        <p>Protein</p>
                        {mainList.map((item, index) => (
                            <div key={index} className="flex items-center justify-around mb-[12px]">
                                <Button onClick={() => setVisible(true)}>{item.name}</Button>
                            </div>
                        ))}
                        <p>Sauces</p>
                        {mainList.map((item, index) => (
                            <div key={index} className="flex items-center justify-around mb-[12px]">
                                <Button onClick={() => setVisible(true)}>{item.name}</Button>
                            </div>
                        ))}
            </Modal>
        </>
    )
}

export default Home