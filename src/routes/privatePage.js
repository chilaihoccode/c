import { BrowserRouter as Router ,Routes,Route } from "react-router-dom";


function PrivatePages(prop) {

    return (
        <>
            <Route path={prop.path} element={prop.component} />
        </>
    )
}

export default PrivatePages;