import React from 'react'
import Panel from './Panel'
import Button from './Button'
import Input from './Input'

// Panels
const ChangePassword = (props) => {
    const { currentServer, setCurrentServer, initialCurrentServer, handleChangeCurrentServer } = props

    const changePassword = async(event) => {
        event.preventDefault()

        console.log("changePassword sent request");

        const response = await fetch('http://localhost:8080/change_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentServer),
        })

        setCurrentServer(initialCurrentServer);

        console.log("changePassword got response");
    }

    return (
        <Panel className="h-[48%]" title="User Settings">
            <div className="flex justify-between">
                <Button onClick={changePassword}>Change Password</Button>
                <Button type="danger">Log Off</Button>
            </div>
            <div className="mt-[20px]">
                <Input id="username" label="Username" handleInputChange={handleChangeCurrentServer} value={currentServer.username}/>
                <Input id="old_password" type="password" label="Old Password" handleInputChange={handleChangeCurrentServer} value={currentServer.old_password}/>
                <Input id="updated_password" type="password" label="New Password" handleInputChange={handleChangeCurrentServer} value={currentServer.updated_password}/>
            </div>
        </Panel>
    )
}

export default ChangePassword



