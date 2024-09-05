import { useContext } from 'react'

import { authContext } from '~/store/context';
import TestToken from '~/services/testToken';

function Navbar () {
  const { userData } = useContext(authContext)
  let currentPath = window.location.pathname

    // console.log('current path', currentPath === '/')
    if(userData && userData.isAuthenication === true|| currentPath === '/') {
      // console.log('okkkk',userData)
      return ( 
          <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand text-primary" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/users">User</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/news">News</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
       );
    }else {
      <>
      {TestToken()}
      </>
    }

}

export default Navbar;