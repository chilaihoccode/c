import {  useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { authContext } from "~/store/context";


function TestToken() {
    let navigate = useNavigate()
    const { userData } = useContext(authContext)
    // console.log('>> check userData after login', userData)
    useEffect(() => {
        if(!userData || userData.isAuthentication === false) {
            // console.log('not ok')
        navigate('/login')
        }
    },[])
}       


export default TestToken;