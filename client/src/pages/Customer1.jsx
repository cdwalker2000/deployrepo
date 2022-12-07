import React, { useState } from 'react'
import logo from '../assets/logo.png';
import { HiOutlineVolumeUp } from 'react-icons/hi'
import Button from '../components/Button';
import Modal from 'antd/lib/modal/Modal';
import menu from '../assets/menu.webp'
import { Button as AButton } from 'antd';
import ModalC from '../components/Modal';
import Mains from '../components/Customer/Mains';
import Starters from '../components/Customer/Starters';


const Panel = ({ children, title, className }) => {
    return (
        <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
            <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
            {children}
        </div>
    )
}

const Customer1 = () => {
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
    const [visible, setVisible] = useState(false); //control modal view
    // modal footer button group
    const customerFooter = [
        <AButton key="back">
            cancel
        </AButton>,
        <AButton key="submit" type="danger" >
            <i className="ri-delete-bin-4-fill"></i>
            delete
        </AButton>,
        <AButton
            key="link"
            href="https://google.com"
            type="primary"
        >
            confirm
        </AButton>,
    ]
    const mainList =
        [{ name: "grain bowl", price: '7.79' },
        { name: "salad", price: '7.69' },
        { name: "greens and grains", price: '7.69' },
        { name: "combo with drink", price: '8.99' },
        { name: "combo with fries and drink", price: '8.99' },
        { name: "pita", price: '7.69' }]

        const initialCurrentDish = {"dishname": "", "proteinname": "", "ingr1name": "", "ingr2name": "", "ingr3name": "", "ingr4name": "", "saucename": "", "have_drink": -1, "total_cost": -1.11}
        const [currentDish, setCurrentDish] = useState(initialCurrentDish)
    
        const [ingrCount, setIngrCount] = useState(0)
    
    
        const addIngredient = (item, category) => {
            let colname = "";
            let canAddIngredient = true;
            if (category == "protein") {
                colname = "protein_name";
            }
            if (category == "topping") {
                if (ingrCount < 4) {
                    colname = "ingr" + (ingrCount+1) + "_name";
                    setIngrCount(ingrCount + 1);
                }
                else {
                    canAddIngredient =  false;
                }
            }
            if (category == "sauce") {
                colname = "sauce_name";
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
        <div>
            <div className="pt-[30px] px-[50px]">
                <img className="h-[150px]" src={logo} />
            </div>
            <div className="absolute h-[70px] w-[70px] right-[50px] top-[30px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                <HiOutlineVolumeUp size={30} color="white" />
            </div>
            {/* click open cart modal */}
            <div onClick={() => setVisible(true)} className="absolute text-white h-[70px] w-[70px] right-[50px] top-[120px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">Cart</div>
            <div className="flex md:flex-row relative justify-between mt-[100px] px-[50px]">
                {/* <Panel className="w-[48%]" title="Main">
                    {mainList.map((item, index) => (
                        <div key={index} className="flex items-center justify-between mb-[12px]">
                            <div className="w-[100px] h-[100px] rounded-[4px] overflow-hidden">
                                <img className="w-full h-full" src={menu} />
                            </div>
                            <Button>{item.name}</Button>
                            <span className="font-bold text-red-500">${item.price}</span>
                        </div>
                    ))}
                </Panel> */}
                <Mains currentDish={currentDish} setCurrentDish={setCurrentDish} />
                {/* <Panel className="w-[48%]" title="Starter">
                    {mainList.map((item, index) => (
                        <div key={index} className="flex items-center justify-between mb-[12px]">
                            <div className="w-[100px] h-[100px] rounded-[4px] overflow-hidden">
                                <img className="w-full h-full" src={menu} />
                            </div>
                            <Button>{item.name}</Button>
                            <span className="font-bold text-red-500">${item.price}</span>
                        </div>
                    ))}
                </Panel> */}
                <Starters currentDish={currentDish} setCurrentDish={setCurrentDish} />
            </div>
            <ModalC
                close={() => setVisible(false)}
                visible={visible}
                title="Add Ons"
            >
                    <div>
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
                            <span className="text-red-500">$100.5</span>
                        </div>
                    </div>
                    <div className="min-h-[60px] items-center flex w-full">
                        <Button className="mx-[5px]">Cancel</Button>
                        <Button className="mx-[5px]">Delete</Button>
                        <Button className="mx-[5px]">Confirm</Button>
                    </div>
                    </div>
            </ModalC>
        </div>
    )
}

export default Customer1