import { authContext } from "./context";
import { useState } from 'react'

function AuthProvider({children}) {
    const [userData,setUserData] = useState({
        isAuthentication : false,
        token : '',
        account : {}
    })

    //Login
    const loginContext = (data) => {
        setUserData(data)
    }

    //Logout
    const logoutContext = () => {
        setUserData({
            isAuthentication : false,
            token : '',
            account : {}
        })
    }


    return ( <authContext.Provider value={{userData,loginContext,logoutContext}}>{children}</authContext.Provider> );
}

export default AuthProvider;