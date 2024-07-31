import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";


function TestToken() {
    let navigate = useNavigate()
    
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