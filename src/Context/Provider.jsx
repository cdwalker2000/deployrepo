import React,{createContext,useState,useContext} from 'react'

// Context is used to manage global state
const Context = createContext();
// Export the context for use by the child components
export const useCustomContext = () => useContext(Context)

const Provider = ({children}) => {
    const [user,setUser] = useState({
        firstName: '',
        lastName: ''
    })

    const handleChange = (value,name) => {
        setUser(prev => ({...prev,[name]: value}))
    } 

    return (
        <Context.Provider value={{
            user,
            handleChange
        }}>{children}</Context.Provider>
    )
}

export default Provider