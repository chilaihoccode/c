import {  useNavigate,redirect,useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { authContext } from "~/store/context";


function TestToken() {
    // let navigate = useNavigate()
    // let location = useLocation()
    const { userData } = useContext(authContext)
    // console.log('>> check userData after login', userData)
    
    
        // useEffect(() => {
        //     if(!userData || userData.isAuthentication === false) {
        //     redirect('/login')
        //     }
        // },[])

    

}

export default TestToken;