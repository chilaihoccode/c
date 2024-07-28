import classNames from "classnames/bind";
import _ from 'lodash'
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";

import styles from './user.module.scss'

const cx = classNames.bind(styles)

function Users() {
    const navigate = useNavigate()
    useEffect(() => {
        let session = sessionStorage.getItem('Account')

        if(!session) {
            navigate('/')
            return
        }
    },[])

    return ( 
        <div>
            <h1>Users is have token</h1>
        </div>
    );
}

export default Users;