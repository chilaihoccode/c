import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router ,Routes,Route } from "react-router-dom";


function PrivatePages(prop) {
    const navigate = useNavigate()

    useEffect(() => {
        let session = sessionStorage.getItem('Account')
        if(!session) {
            navigate('/')
            return
        }
    },[navigate])
    // console.log('>> path',prop.path,'>> component',prop.component)
    return ( 
   
        <>
            <Route path={prop.path} element={prop.component} />
        </>
   
    )
}

export default PrivatePages;