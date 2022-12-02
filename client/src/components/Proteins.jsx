import React, { useState, useEffect } from 'react'
import Panel from './Panel'
import Ingredient from './Ingredient'

// Panels
const Proteins = (props) => {
    const { addIngredient } = props

    const [proteins,setProteins] = useState([])

    useEffect(() => {
        fetchProteins();
    }, [])


    const fetchProteins = async () => {
        const result = await fetch(`http://localhost:8080/proteins`)      // change to final deployment site
        result
            .json()
            .then(result => setProteins(result))
            .catch(e => console.log(e))
    }

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



