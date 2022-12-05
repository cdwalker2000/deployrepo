import React, { useState, useEffect } from 'react'
import Panel from './Panel'
import Dish from './Dish'

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

    

    const addStarter = (item) => {
        // BLOCK ANY INGREDIENTS --> NEED TO IMMEDIATELY ADD THE DISH INSTEAD OF CLICKING ANY TOPPINGS
        // ALSO CREATE NEW COMPONENT WITHOUT ANY CHILDREN, JUST THE NAME OF THE DISH AND THE PRICE
        console.log("dish_name, dish_price");
        setCurrentDish({ ...currentDish, ["dish_name"]: item.dish_name, ["total_cost"]: item.dish_price });
    }

    return (
        <Panel className="h-[48%]" title="Starter">
            {starters.map((item, index) => (
                <Dish key={"starter_" + item.dish_name} dish_name={item.dish_name} dish_price={item.dish_price} onClick={() => addStarter(item)} />
            ))}
        </Panel>
    )
}

export default Starters


