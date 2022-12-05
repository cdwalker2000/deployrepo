import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'
// import NavBar from '../components/NavBar'
// import { useCustomContext } from '../Context/Provider'
// import menu from '../assets/menu.webp'
import Cart from '../components/Cart'
import RegisterCustomer from '../components/RegisterCustomer'
import ChangePassword from '../components/ChangePassword'
import Mains from '../components/Mains'
import Starters from '../components/Starters'
import Proteins from '../components/Proteins'
import Toppings from '../components/Toppings'
import Sauces from '../components/Sauces'


const Server = () => {

    const initialCurrentDish = {"dish_name": "_", "protein_name": "_", "ingr1_name": "_", "ingr2_name": "_", "ingr3_name": "_", "ingr4_name": "_", "sauce_name": "_", "have_drink": -1, "total_cost": -1.11}
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
        <>
            {/* <NavBar /> */}
            <div className="flex flex-col md:flex-row h-[600px] relative mt-[90px] px-[50px]">
                <div className="absolute h-[70px] w-[70px] right-[50px] top-[0px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={30} color="white" />
                </div>

                <Cart currentDish={currentDish} setCurrentDish={setCurrentDish} initialCurrentDish={initialCurrentDish} setIngrCount={setIngrCount}/>
                
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
                    <ChangePassword />
                    <RegisterCustomer />
                </div>
            </div>
            <div className="flex flex-col px-[50px] md:flex-row justify-between h-[800px] mt-[50px] pb-[50px] relative">
                <div className={'w-[50%] mr-[20px] h-full flex flex-col justify-between'}>
                    <Mains currentDish={currentDish} setCurrentDish={setCurrentDish}/>
                    <Starters currentDish={currentDish} setCurrentDish={setCurrentDish} />
                </div>
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                    <Proteins addIngredient={addIngredient} />
                    <div className={'w-full h-[48%] mr-[20px] flex justify-between relative'}>
                        <Toppings addIngredient={addIngredient} />
                        <Sauces addIngredient={addIngredient} />
                    </div>
                </div>
                <Button className="absolute bottom-0 right-0">View Order</Button>
            </div>
        </>
    )
}

export default Server