import React, { useState, useEffect } from 'react'
import Panel from './Panel'
import Ingredient from './Ingredient'

// Panels
const Toppings = (props) => {
    const { addIngredient } = props

    const [toppings,setToppings] = useState([])

    useEffect(() => {
        fetchToppings();
    }, [])

    const fetchToppings = async () => {
        const result = await fetch(`http://localhost:8080/toppings`)      // change to final deployment site
        result
            .json()
            .then(result => setToppings(result))
            .catch(e => console.log(e))
    }



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



