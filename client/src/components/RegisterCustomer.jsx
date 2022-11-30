import React from 'react'
import Panel from './Panel'
import Input from './Input'
import Button from './Button'

// Panels
const RegisterCustomer = (props) => {
    const { newCustomer, handleChangeNewCustomer, addCustomer} = props

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



