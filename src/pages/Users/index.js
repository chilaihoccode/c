import classNames from "classnames/bind";
import _ from 'lodash'

import TestToken from "~/services/testToken";

import styles from './user.module.scss'

const cx = classNames.bind(styles)

function Users() {
    TestToken()
    return ( 
        <div>
            <h1>Users is have token 1</h1>
        </div>
    );
}

export default Users;