import React from 'react'
import Panel from './Panel'
import Ingredient from './Ingredient'

// Panels
const Sauces = (props) => {
    const { sauces, addIngredient } = props

    return (
        <Panel className="w-[48%] h-full" title="Sauces">
            {
                sauces.map((item, index) => (
                    <Ingredient key={"sauce_" + item.ingredient_name} label={item.ingredient_name} onClick={() => addIngredient(item, "sauce")} />
                ))
            }
        </Panel>
    )
}

export default Sauces
