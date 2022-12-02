import React, { useState, useEffect } from 'react'
import Panel from './Panel'
import Ingredient from './Ingredient'

// Panels
const Sauces = (props) => {
    const { addIngredient } = props

    const [sauces,setSauces] = useState([])


    useEffect(() => {
        fetchSauces();
    }, [])

    const fetchSauces = async () => {
        const result = await fetch(`http://localhost:8080/sauces`)      // change to final deployment site
        result
            .json()
            .then(result => setSauces(result))
            .catch(e => console.log(e))
    }


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
