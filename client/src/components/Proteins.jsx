import React from 'react'
import Panel from './Panel'
import Ingredient from './Ingredient'

// Panels
const Proteins = (props) => {
    const { proteins, addIngredient } = props

    return (
        <Panel className="h-[48%]" title="Protein">
            {
                proteins.map((item, index) => (
                    <Ingredient key={"protein_" + item.ingredient_name} label={item.ingredient_name} onClick={() => addIngredient(item, "protein")} />
                ))
            }
        </Panel>
    )
}

export default Proteins



