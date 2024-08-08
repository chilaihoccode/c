import classNames from "classnames/bind";
import { useState,useEffect } from "react";
import ReactPaginate from "react-paginate";
import _ from 'lodash'

import * as apiServices from '~/apiServices/userService'

import TestToken from "~/services/testToken";

import styles from './user.module.scss'

const cx = classNames.bind(styles)


function Users() {
    const [listUser,setListUser] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [currentLimit,setCurrentLimit] = useState(2)
    const [totalPage,setTotalPage ] = useState(1)
    
    
    useEffect(() => {
        fetchApi()
    },[currentPage])
    const fetchApi = async () => {
        const dataUsers = await apiServices.getAllUser(+currentPage,+currentLimit)
        console.log(dataUsers)
        if(dataUsers && dataUsers.DT && dataUsers.EC === 0) {
            setListUser(dataUsers.DT.users)   
            setTotalPage(dataUsers.DT.totalPages)         
        }
    }
    
    //console.log(listUser)

    const handlePageClick = async (event) => {
        // alert(event.selected)
        setCurrentPage(event.selected + 1)
        // await fetchApi(currentPage)
    }

    TestToken()
    return ( 
        <div className="container">
            <div className="wrapper-user-managent d-flex align-items-center justify-content-between">
                <h1>Users Page</h1>
                <div className="div-btn">
                    <button className="btn btn-success btn-sm mx-2">Refresh</button>
                    <button className="btn btn-primary btn-sm">Add User</button>
                </div>
            </div>
            <table className="table table-light table-hover table-bordered table-sm mt-2">
                <thead>
                    <tr>
                    <th scope="col">No</th>
                    <th scope="col">User name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Group</th>
                    </tr>
                </thead>
                <tbody>     
                    {listUser && listUser.length > 0 ?
                        <>
                            {listUser.map((data,index) => {
                                return(
                                    <tr key={`row-${index}`}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.username}</td>
                                        <td>{data.email}</td>
                                        <td>{data.Group ? data.Group.name : ''}</td>
                                        {/* {console.log(data)} */}
                                    </tr>
                                ) 
                            })}
                        </>
                        :
                        <>
                            <tr>
                                <td>NO data</td>
                            </tr>
                        </>
                    }
                </tbody>    
                   
            </table>
            {totalPage > 0 && 
                <div className={cx('user-footer')}>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        />
                </div>
            }
        </div>

    );
}

export default Users;