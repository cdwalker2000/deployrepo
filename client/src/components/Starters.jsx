import React from 'react'
import Panel from './Panel'
import Dish from './Dish'

// Panels
const Starters = (props) => {
    const { starters, currentDish, setCurrentDish } = props

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



