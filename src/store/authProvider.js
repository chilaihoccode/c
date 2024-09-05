
import { authContext } from "./context";
import { useState,useEffect } from 'react'

import * as apiService from '~/apiServices/userService'

function AuthProvider({children}) {
    const [userData,setUserData] = useState({
        isLoading : true,
        isAuthentication : false,
        token : '',
        account : {}
    })

    useEffect(() => {
        fetchData()
    },[])

    //fetch user data account
    const fetchData = async () => {
        let response = await apiService.account()
        console.log(response)
        if(response && +response.EC === 0) {
            const email = response.DT.email
            const username = response.DT.username
            const groupWithRole = response.DT.groupWithRole
            const token = response.DT.token

            let data = {
                isLoading : false,
                isAuthenication : true,
                token,
                account : {email,username,groupWithRole}
            }   
                setUserData(data)
        }
    }

    //Login
    const loginContext = (data) => {
        setUserData({...data,isLoading : false})
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