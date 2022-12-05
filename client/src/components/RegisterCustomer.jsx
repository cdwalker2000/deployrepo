import React, { useState } from 'react'
import Panel from './Panel'
import Input from './Input'
import Button from './Button'

// Panels
const RegisterCustomer = () => {
    const initialNewCustomer = {"new_fname": "", "new_lname": "", "new_username": "", "new_password": "", "new_role": "customer"}
    const [newCustomer,setNewCustomer] = useState(initialNewCustomer)

    const handleChangeNewCustomer = event => {
        const { id, value } = event.target
        setNewCustomer({ ...newCustomer, [id]: value })
    }

    const addCustomer = async(event) => {
        event.preventDefault()

        console.log("addCustomer sent request");

        const response = await fetch('http://localhost:8080/new_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCustomer),
        })

        setNewCustomer(initialNewCustomer);

        console.log("addCustomer got response");
    }

    return (
        <Panel className="h-[48%]" title="Register New Customer">
            <div className="mt-[20px]">
                <Input id="new_fname" label="First Name" handleInputChange={handleChangeNewCustomer} value={newCustomer.new_fname}/>
                <Input id="new_lname" label="Last Name" handleInputChange={handleChangeNewCustomer} value={newCustomer.new_lname}/>
            
                <Input id="new_username" label="Username" handleInputChange={handleChangeNewCustomer} value={newCustomer.new_username}/>
                <Input id="new_password" type="password" label="Password" handleInputChange={handleChangeNewCustomer} value={newCustomer.new_password}/>
            </div>
            <div className="flex justify-between">
                <Button onClick={addCustomer}>Add Customer</Button>
            </div>
        </Panel>
    )
}

export default RegisterCustomer



