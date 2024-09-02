import {  useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { authContext } from "~/store/context";


function TestToken() {
    let navigate = useNavigate()
    const { userData } = useContext(authContext)
    console.log('>> check userData after login', userData)

    return (
        useEffect(() => {
            let session = sessionStorage.getItem('Account')
            if(!session) {
                navigate('/')
                return
            }
        },[])
    )

}

export default TestToken;