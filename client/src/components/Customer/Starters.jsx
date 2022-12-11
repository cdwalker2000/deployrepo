import React, { useState, useEffect } from 'react'
import Dish from '../Customer/Dish'

// Panels
const Starters = (props) => {
    const { currentDish, setCurrentDish } = props


    const [starters, setStarters] = useState([])

    useEffect(() => {
        fetchStarters();
    }, [])

    const fetchStarters = async () => {
        const result = await fetch(`http://localhost:8080/starters`)      // change to final deployment site
        result
            .json()
            .then(result => setStarters(result))
            .catch(e => console.log(e))
    }


    const addStarter = async (item) => {    
        // BLOCK ANY INGREDIENTS --> NEED TO IMMEDIATELY ADD THE DISH INSTEAD OF CLICKING ANY TOPPINGS
        // JC : popup/green check at top on Customer 1 after pressing this (since we don't go to a new page, need feedback)

        console.log("addStarter sends request");
        
        await fetch('http://localhost:8080/add_dish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"dish_name": item.dish_name}),
        })

        console.log("addStarter got response");

        // JC : NAVIGATE BACK TO CUSTOMER 1 (or stay on the same page in this case)

        console.log("finalizeDish sends request");
    
        await fetch('http://localhost:8080/finalize')

        console.log("finalizeDish got response");
        
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
        <Panel className="w-[48%]" title="Starter">
            {starters.map((item, index) => (
                <Dish key={"starter_" + item.dish_name} dish_name={item.dish_name} dish_price={item.dish_price} onClick={() => addStarter(item)} />
            ))}
        </Panel>
    )
}

export default Starters



