import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'
// import NavBar from '../components/NavBar'
// import { useCustomContext } from '../Context/Provider'
// import menu from '../assets/menu.webp'

//Order items
const OrderItem = ({price,name}) => {
    const baseClasses = 'flex rounded-[7px] justify-between shadow-md h-[50px] bg-gray-50 mb-[7px] transition-all hover:bg-gray-200 items-center px-[20px]'
    return (
        <div className={baseClasses}>
            <span>{name}</span>
            <span>{price}</span>
        </div>
    )
}

// protein buttons
const ProteinItem = ({name}) => {
    // const baseClasses = 'flex rounded-[7px] justify-between shadow-md h-[50px] bg-gray-50 mb-[7px] transition-all hover:bg-gray-200 items-center px-[20px]'
    return (
        // <div className={baseClasses}>
        //     <span>{name}</span>
        //     <span>{price}</span>
        // </div>
        <form>
            <input type="submit">{name}</input>
        </form>
    )
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
const Home = () => {
    
    // const initialNewUserState = {"fname": "", "lname": "", "username": "", "password": "", "role": "customer"}

    // const [cart,setCart] = useState([])
    const [proteins,setProteins] = useState([])
    const [toppings,setToppings] = useState([])
    const [sauces,setSauces] = useState([])
    // const [newUser, setNewUser] = useState(initialNewUserState)


    useEffect(() => {
        // fetchCart();
        fetchProteins();
        fetchToppings();
        fetchSauces();
    }, [])
    
    // const fetchCart = async () => {
    //     const result = await fetch(`http://localhost:8080/cart`)      // change to final deployment site
    //     result
    //         .json()
    //         .then(result => setCart(result))
    //         .catch(e => console.log(e))
    // }

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

    // const handleInputChange = event => {
    //     const { id, value } = event.target
    //     setNewUser({ ...newUser, [id]: value })
    // }
    const handleChange = event => {
        const { id, value } = event.target
        // setNewUser({ ...newUser, [id]: value })
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

    
    //   const protein = ["vegetable medley", "chicken", "gyro", "meatballs", "falafel"]
    //   const toppings = ["pickled onions", "diced cucumbers", "citrus couscous", "roasted cauliflower", "tomato-onion salad", "kalamata olives", "roasted peppers", "red cabbage slaw"]
    //   const sauces = ["hummus", "red pepper hummus", "jalapeno feta", "tzatziki", "greek vinaigrette", "harissa"]
      // checkOrder data
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
    //   const { user, handleChange } = useCustomContext();
    const user = {firstName: "", lastName: ""}
      // order list
      const [order, setOrder] = useState([
          { name: 'test order', price: '$100.8' },
      ])
  
      // get the total price
      const getTotal = () => {
          let sum = 0;
          sum = menuList.reduce((cur,item) => {
              return cur + item.price
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
                    <div className="min-h-[60px] items-center flex w-full">
                        <Button className="mx-[5px]">Cancel</Button>
                        <Button className="mx-[5px]">Delete</Button>
                        <Button className="mx-[5px]">Add Order</Button>
                        <Button className="mx-[5px]">Confirm</Button>
                    </div>
                </Panel>
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
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
                                    {/* <img className="w-full h-full" src={menu} /> */}
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
                                    {/* <img className="w-full h-full" src={menu} /> */}
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
                            proteins.map((item, index) => (
                                <div key={index} className="flex items-center justify-between mb-[12px]">
                                    <div className="w-[50px] h-[50px] rounded-[4px] overflow-hidden">
                                        {/* <img className="w-full h-full" src={menu} /> */}
                                    </div>
                                    <Button>{item.ingredient_name}</Button>
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
                                            {/* <img className="w-full h-full" src={menu} /> */}
                                        </div>
                                        <Button key={index}>{item.ingredient_name}</Button>
                                    </div>
                                ))
                            }
                        </Panel>
                        <Panel className="w-[48%] h-full" title="Sauces">
                            {
                                sauces.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between mb-[12px]">
                                        <div className="w-[50px] h-[50px] rounded-[4px] overflow-hidden">
                                            {/* <img className="w-full h-full" src={menu} /> */}
                                        </div>
                                        <Button key={index}>{item.ingredient_name}</Button>
                                    </div>
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