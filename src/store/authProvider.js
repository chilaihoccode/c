import { context } from "./context";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from 'react'
import _ from 'lodash'

function authContext({children}) {

    const navigate = useNavigate()

    useEffect(() => {
        let getToken = sessionStorage.getItem('Account')
        const [authToken,setAuthToken] = useState(getToken || [])
        
        if(getToken && !_.isEmpty(getToken) && getToken.isAuthenication) {
            navigate('/user')
            return
        }
        navigate('/')

        return () => {

        }

    },[])

    return ( <context.Provider value={authToken}>{children}</context.Provider> );
}

export default authContext;