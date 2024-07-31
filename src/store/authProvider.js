import { context } from "./context";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from 'react'
import _ from 'lodash'

function AuthProvider({children}) {

    const navigate = useNavigate()

    useEffect(() => {
        let getToken = sessionStorage.getItem('Account')
        const [authToken,setAuthToken] = useState(getToken)
        
        const unsubcrised = () => {
            if(!authToken) {
                navigate('/')
                return
            }
          
        }

        //clear up function
        return () => {
            unsubcrised()
        }

    },[])

    return ( <context.Provider value={authToken}>{children}</context.Provider> );
}

export default AuthProvider;