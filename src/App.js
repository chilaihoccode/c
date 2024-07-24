import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Fragment } from 'react';

import Navbar from './components/Layout/Header/Nav';
import { publicRoutes } from './routes'; 

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
            {publicRoutes.map((route,index) => {
              let Layout = Fragment
              let Page = route.component
              return(
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                  />
                )
              })
            }
        </Routes>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
             
            />
      </Router>
    </div>
  );
}

export default App;
