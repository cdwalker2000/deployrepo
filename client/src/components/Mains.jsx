import React from 'react'
import Panel from './Panel'
import Dish from './Dish'

// Panels
const Mains = (props) => {
    const { mains, currentDish, setCurrentDish } = props

    const addMain = (item) => {
        console.log("dish_name, dish_price");
        setCurrentDish({ ...currentDish, ["dish_name"]: item.dish_name, ["total_cost"]: item.dish_price });
    }

    return (
        <Panel className="h-[48%]" title="Main">
            {mains.map((item, index) => (
                <Dish key={"main_" + item.dish_name} dish_name={item.dish_name} dish_price={item.dish_price} onClick={() => addMain(item)} />
            ))}
        </Panel>
    )
}

export default Mains



