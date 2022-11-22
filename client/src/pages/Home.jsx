import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'
// import NavBar from '../components/NavBar'
// import { useCustomContext } from '../Context/Provider'
// import menu from '../assets/menu.webp'
import Dish from '../components/Dish'
import Ingredient from '../components/Ingredient'
import CartItem from '../components/CartItem'



// Panels
const Panel = ({children,title,className}) => {
    return (
        <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
            <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
            {children}
        </div>
    )
}

// Main
const Home = () => {
    
    // const initialNewUserState = {"fname": "", "lname": "", "username": "", "password": "", "role": "customer"}
    const initialCurrentDish = {"dish_name": "_", "protein_name": "_", "ingr1_name": "_", "ingr2_name": "_", "ingr3_name": "_", "ingr4_name": "_", "sauce_name": "_", "have_drink": -1, "total_cost": -1.11}
    const initialCurrentServer = {"username": "", "old_password": "", "updated_password": ""}
    const initialNewCustomer = {"new_fname": "", "new_lname": "", "new_username": "", "new_password": "", "new_role": "customer"}

    const [cart,setCart] = useState([])
    const [currentServer,setCurrentServer] = useState(initialCurrentServer)
    const [newCustomer,setNewCustomer] = useState(initialNewCustomer)
    const [mains,setMains] = useState([])
    const [starters,setStarters] = useState([])
    const [proteins,setProteins] = useState([])
    const [toppings,setToppings] = useState([])
    const [sauces,setSauces] = useState([])
    const [currentDish, setCurrentDish] = useState(initialCurrentDish)
    const [ingrCount, setIngrCount] = useState(0)
    // const [newUser, setNewUser] = useState(initialNewUserState)


    useEffect(() => {
        fetchCart();
        fetchMains();
        fetchStarters();
        fetchProteins();
        fetchToppings();
        fetchSauces();
    }, [])
    
    const fetchCart = async () => {
        const result = await fetch(`http://localhost:8080/cart`)      // change to final deployment site
        result
            .json()
            .then(result => setCart(result))
            .catch(e => console.log(e))
    }

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

    const changePassword = async(event) => {
        event.preventDefault()

        console.log("changePassword sent request");

        const response = await fetch('http://localhost:8080/change_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentServer),
        })

        setCurrentServer(initialCurrentServer);

        console.log("changePassword got response");
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

    const addMain = (item) => {
        console.log("dish_name, dish_price");
        setCurrentDish({ ...currentDish, ["dish_name"]: item.dish_name, ["total_cost"]: item.dish_price });
    }

    const addStarter = (item) => {
        // BLOCK ANY INGREDIENTS --> NEED TO IMMEDIATELY ADD THE DISH INSTEAD OF CLICKING ANY TOPPINGS
        // ALSO CREATE NEW COMPONENT WITHOUT ANY CHILDREN, JUST THE NAME OF THE DISH AND THE PRICE
        console.log("dish_name, dish_price");
        setCurrentDish({ ...currentDish, ["dish_name"]: item.dish_name, ["total_cost"]: item.dish_price });
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

    const deleteLastDish = async (event) => {
        console.log("deleteLastDish sends request");

        const response = await fetch('http://localhost:8080/delete_last_dish', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log("deleteLastDish got response");
        fetchCart();
    }

    const addDishToCart = async (event) => {
        event.preventDefault()
        
        console.log("addDishToCart sends request");
        
        const response = await fetch('http://localhost:8080/add_dish_to_cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentDish),
        })
        console.log("addDishToCart got response");
        console.log(response)
        fetchCart();
        setCurrentDish(initialCurrentDish);
        setIngrCount(0);
    }

    const cancelOrder = async (event) => {
        // GO BACK TO LOGIN SCREEN ???

        event.preventDefault()
        
        console.log("clearCart sends response");
        
        const response = await fetch('http://localhost:8080/clear_cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: "",
        })
        console.log("clearCart got response");
        console.log(response)
        fetchCart();
        setCurrentDish(initialCurrentDish);
        setIngrCount(0);
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

    
    //   const { user, handleChange } = useCustomContext();
    const user = {firstName: "", lastName: ""}
      // order list
      const [order, setOrder] = useState([
          { name: 'test order', price: '$100.8' },
      ])
  
      // get the total price
      const getTotal = () => {
          let sum = 0;
          sum = cart.reduce((cur,item) => {
              return cur + item.total_cost
          },0)
          // keep 2 digits
          return sum.toFixed(2);
      }
      // intital orders just for testing
      const initMockList = () => {
          const mock = Array.from(new Array(20)).map((_, index) => ({ name: `order ${index}`, price: `$${Math.round(Math.random() * 50 + 10)}` }))
          setOrder(mock)
      }
      useEffect(() => {
          initMockList()
      }, [])


    return (
        <>
            {/* <NavBar /> */}
            <div className="flex flex-col md:flex-row h-[600px] relative mt-[90px] px-[50px]">
                <div className="absolute h-[70px] w-[70px] right-[50px] top-[0px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={30} color="white" />
                </div>
                <Panel title="Current Order/Check Out" className="mr-[25px] relative w-full md:w-[500px] h-full flex flex-col items-between">
                    <div className="h-full px-[10px] overflow-auto">
                        {cart.map((item, index) => (
                            <CartItem key={item + "_" + index} item={item} index={index} />
                        ))}
                        <div className="flex font-bold text-xl justify-between items-center">
                            <span>Total</span>
                            <span className="text-red-500">${getTotal()}</span>
                        </div>
                    </div>
                    <div className="min-h-[60px] items-center flex w-full">
                        <Button onClick={cancelOrder} className="mx-[5px]">Cancel</Button>
                        <Button onClick={deleteLastDish} className="mx-[5px]">Delete Last Dish</Button>
                        <Button onClick={addDishToCart} className="mx-[5px]">Add Dish</Button>
                        <Button className="mx-[5px]">Confirm</Button>
                    </div>
                </Panel>
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
                    <Panel className="h-[48%]" title="User Settings">
                        <div className="flex justify-between">
                            <Button onClick={changePassword}>Change Password</Button>
                            <Button type="danger">Log Off</Button>
                        </div>
                        <div className="mt-[20px]">
                            <Input id="username" label="Username" handleInputChange={handleChangeCurrentServer} value={currentServer.username}/>
                            <Input id="old_password" type="password" label="Old Password" handleInputChange={handleChangeCurrentServer} value={currentServer.old_password}/>
                            <Input id="updated_password" type="password" label="New Password" handleInputChange={handleChangeCurrentServer} value={currentServer.updated_password}/>
                        </div>
                    </Panel>
                    <Panel className="h-[48%]" title="Register New Customer">
                        <div className="mt-[20px]">
                            <Input id="new_fname" label="First Name" handleInputChange={handleChangeNewCustomer} value={newCustomer.new_fname}/>
                            <Input id="new_lname" label="Last Name" handleInputChange={handleChangeNewCustomer} value={newCustomer.new_lname}/>
                        
                            <Input id="new_username" label="Username" handleInputChange={handleChangeNewCustomer} value={newCustomer.new_username}/>
                            <Input id="new_password" type="password" label="Password" handleInputChange={handleChangeNewCustomer} value={newCustomer.new_password}/>
                        </div>
                        <div className="flex justify-between">
                            <Button onClick={addCustomer}>Add Customer</Button>
                        </div>
                    </Panel>
                </div>
            </div>
            <div className="flex flex-col px-[50px] md:flex-row justify-between h-[800px] mt-[50px] pb-[50px] relative">
                <div className={'w-[50%] mr-[20px] h-full flex flex-col justify-between'}>
                    <Panel className="h-[48%]" title="Main">
                        {mains.map((item, index) => (
                            <Dish key={"main_" + item.dish_name} dish_name={item.dish_name} dish_price={item.dish_price} onClick={() => addMain(item)} />
                        ))}
                    </Panel>
                    <Panel className="h-[48%]" title="Starter">
                        {starters.map((item, index) => (
                            <Dish key={"starter_" + item.dish_name} dish_name={item.dish_name} dish_price={item.dish_price} onClick={() => addStarter(item)} />
                        ))}
                    </Panel>
                </div>
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                    <Panel className="h-[48%]" title="Protein">
                        {
                            proteins.map((item, index) => (
                                <Ingredient key={"protein_" + item.ingredient_name} label={item.ingredient_name} onClick={() => addIngredient(item, "protein")} />
                            ))
                        }
                    </Panel>
                    <div className={'w-full h-[48%] mr-[20px] flex justify-between relative'}>
                        <Panel className="w-[48%] h-full" title="Toppings">
                            {
                                toppings.map((item, index) => (
                                    <Ingredient key={"topping_" + item.ingredient_name} label={item.ingredient_name} onClick={() => addIngredient(item, "topping")} />
                                ))
                            }
                        </Panel>
                        <Panel className="w-[48%] h-full" title="Sauces">
                            {
                                sauces.map((item, index) => (
                                    <Ingredient key={"sauce_" + item.ingredient_name} label={item.ingredient_name} onClick={() => addIngredient(item, "sauce")} />
                                ))
                            }
                        </Panel>
                    </div>
                </div>
                <Button className="absolute bottom-0 right-0">View Order</Button>
            </div>
        </>
    )
}

export default Home