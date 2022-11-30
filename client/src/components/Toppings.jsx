import React from 'react'
import Panel from './Panel'
import Ingredient from './Ingredient'

// Panels
const Toppings = (props) => {
    const { toppings, addIngredient } = props

    return (
        <Panel className="w-[48%] h-full" title="Toppings">
            {
                toppings.map((item, index) => (
                    <Ingredient key={"topping_" + item.ingredient_name} label={item.ingredient_name} onClick={() => addIngredient(item, "topping")} />
                ))
            }
        </Panel>
    )
}

export default Toppings



