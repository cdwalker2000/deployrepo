import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'
// import NavBar from '../components/NavBar'
// import { useCustomContext } from '../Context/Provider'
// import menu from '../assets/menu.webp'
import Panel from '../components/Panel'
import Cart from '../components/Cart'
import RegisterCustomer from '../components/RegisterCustomer'
import ChangePassword from '../components/ChangePassword'
import Mains from '../components/Mains'
import Starters from '../components/Starters'
import Proteins from '../components/Proteins'
import Toppings from '../components/Toppings'
import Sauces from '../components/Sauces'

// Main
const Server = () => {
    
    // const initialNewUserState = {"fname": "", "lname": "", "username": "", "password": "", "role": "customer"}
    const initialCurrentDish = {"dish_name": "_", "protein_name": "_", "ingr1_name": "_", "ingr2_name": "_", "ingr3_name": "_", "ingr4_name": "_", "sauce_name": "_", "have_drink": -1, "total_cost": -1.11}
    const [currentDish, setCurrentDish] = useState(initialCurrentDish)

    const initialCurrentServer = {"username": "", "old_password": "", "updated_password": ""}
    const [currentServer,setCurrentServer] = useState(initialCurrentServer)

    const initialNewCustomer = {"new_fname": "", "new_lname": "", "new_username": "", "new_password": "", "new_role": "customer"}
    const [newCustomer,setNewCustomer] = useState(initialNewCustomer)

    const [mains,setMains] = useState([])
    const [starters,setStarters] = useState([])
    const [proteins,setProteins] = useState([])
    const [toppings,setToppings] = useState([])
    const [sauces,setSauces] = useState([])
    const [ingrCount, setIngrCount] = useState(0)
    // const [newUser, setNewUser] = useState(initialNewUserState)


    useEffect(() => {
        fetchMains();
        fetchStarters();
        fetchProteins();
        fetchToppings();
        fetchSauces();
    }, [])

    const fetchMains = async () => {
        const result = await fetch(`http://localhost:8080/mains`)      // change to final deployment site
        result
            .json()
            .then(result => setMains(result))
            .catch(e => console.log(e))
    }

    const fetchStarters = async () => {
        const result = await fetch(`http://localhost:8080/starters`)      // change to final deployment site
        result
            .json()
            .then(result => setStarters(result))
            .catch(e => console.log(e))
    }

    const fetchProteins = async () => {
        const result = await fetch(`http://localhost:8080/proteins`)      // change to final deployment site
        result
            .json()
            .then(result => setProteins(result))
            .catch(e => console.log(e))
    }

    const fetchToppings = async () => {
        const result = await fetch(`http://localhost:8080/toppings`)      // change to final deployment site
        result
            .json()
            .then(result => setToppings(result))
            .catch(e => console.log(e))
    }

    const fetchSauces = async () => {
        const result = await fetch(`http://localhost:8080/sauces`)      // change to final deployment site
        result
            .json()
            .then(result => setSauces(result))
            .catch(e => console.log(e))
    }

    const handleChangeCurrentServer = event => {
        const { id, value } = event.target
        setCurrentServer({ ...currentServer, [id]: value })
    }

    const handleChangeNewCustomer = event => {
        const { id, value } = event.target
        setNewCustomer({ ...newCustomer, [id]: value })
    }

    

    const addCustomer = async(event) => {
        event.preventDefault()

        console.log("addCustomer sent request");

        const response = await fetch('http://localhost:8080/new_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCustomer),
        })

        setNewCustomer(initialNewCustomer);

        console.log("addCustomer got response");
    }

    

    

    // const getDishType = async (item) => {
    //     let type = "";
    //     const response = await fetch(`http://localhost:8080/dish_type/${item.dish_id}`)
    //     response
    //         .json()
    //         .then(result => type = result.dish_type)
    //         .catch(e => console.log(e))
    //     console.log(type);
    //     return type;
    // }

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

    

    // const submitNewUser = async (event) => {
    //     event.preventDefault()
    
    //     const response = await fetch('http://localhost:8080/users', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(newUser),
    //     })
    //     console.log(response);
    //     setNewUser(initialNewUserState)
    //   }

    
    


    return (
        <>
            {/* <NavBar /> */}
            <div className="flex flex-col md:flex-row h-[600px] relative mt-[90px] px-[50px]">
                <div className="absolute h-[70px] w-[70px] right-[50px] top-[0px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={30} color="white" />
                </div>

                <Cart currentDish={currentDish} setCurrentDish={setCurrentDish} initialCurrentDish={initialCurrentDish} setIngrCount={setIngrCount}/>
                
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
                    <ChangePassword currentServer={currentServer} setCurrentServer={setCurrentServer} initialCurrentServer={initialCurrentServer} handleChangeCurrentServer={handleChangeCurrentServer} />
                    <RegisterCustomer newCustomer={newCustomer} handleChangeNewCustomer={handleChangeNewCustomer} addCustomer={addCustomer} />
                </div>
            </div>
            <div className="flex flex-col px-[50px] md:flex-row justify-between h-[800px] mt-[50px] pb-[50px] relative">
                <div className={'w-[50%] mr-[20px] h-full flex flex-col justify-between'}>
                    <Mains mains={mains} currentDish={currentDish} setCurrentDish={setCurrentDish}/>
                    <Starters starters={starters} currentDish={currentDish} setCurrentDish={setCurrentDish} />
                </div>
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                    <Proteins proteins={proteins} addIngredient={addIngredient} />
                    <div className={'w-full h-[48%] mr-[20px] flex justify-between relative'}>
                        <Toppings toppings={toppings} addIngredient={addIngredient} />
                        <Sauces sauces={sauces} addIngredient={addIngredient} />
                    </div>
                </div>
                <Button className="absolute bottom-0 right-0">View Order</Button>
            </div>
        </>
    )
}

export default Server