import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import CartItem from '../components/CartItem'


const Cart = (props) => {
    const { currentDish, setCurrentDish, initialCurrentDish, setIngrCount } = props;

    const [cart,setCart] = useState([])

    useEffect(() => {
        fetchCart();
    }, [])
    
    const fetchCart = async () => {
        const result = await fetch(`http://localhost:8080/cart`)      // change to final deployment site
        result
            .json()
            .then(result => setCart(result))
            .catch(e => console.log(e))
    }

    // get the total price
    const getTotal = () => {
        let sum = 0;
        sum = cart.reduce((cur,item) => {
            return cur + item.total_cost
        },0)
        // keep 2 digits
        return sum.toFixed(2);
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

    const Panel = ({ children, title, className }) => {
        return (
            <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
                <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
                {children}
            </div>
        )
    }

    return (
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
    )
}

export default Cart