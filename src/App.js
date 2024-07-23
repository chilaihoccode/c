import 'bootstrap/dist/css/bootstrap.min.css';
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
      </Router>
    </div>
  );
}

export default App;
