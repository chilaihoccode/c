
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import _ from 'lodash'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'

import Navbar from './components/Layout/Header/Nav';
import { privateRoutes, publicRoutes } from './routes'; 

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
              {
                privateRoutes.map((route,index) => {
                  
                  // <PrivatePages key={index} path={route.path} component={route.component} />
                  let Layout = Fragment
                  let Page = route.component
                  return (
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
          {/* < PrivatePages  /> */}
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
