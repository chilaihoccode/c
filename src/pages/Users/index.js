import classNames from "classnames/bind";
import { useState,useEffect } from "react";
import ReactPaginate from "react-paginate";
import _, { flatMap } from 'lodash'
import {toast} from 'react-toastify'
import ModalDelete from "./ModalDelete";

import * as apiServices from '~/apiServices/userService'

import TestToken from "~/services/testToken";

import styles from './user.module.scss'
import ModalCreate from "./ModalCreate";

const cx = classNames.bind(styles)


function Users() {
    const [listUser,setListUser] = useState([])
    //paginative
    const [currentPage,setCurrentPage] = useState(1)
    const [currentLimit,setCurrentLimit] = useState(2)
    const [totalPage,setTotalPage ] = useState(1)
    
    // modal 
    const [action,setAction] = useState('')
    const [show,setShow] = useState(false)
    const [handleShowModle,setHandleShowModle] = useState(false)
    const [modalData,setModalData] = useState({})
    const [modalDataEdit,setModalDataEdit] = useState({}) 
    
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

    // const handleRefresh = () => {
    //     setCurrentPage(0)
    //     fetchApi()
    // }

    const handleDelete = async (user) => {
        setModalData(user)
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
        setHandleShowModle(false)
        fetchApi()
    }

    const confirmDeleteData = async () => {
        const data = await apiServices.detroyUser(modalData.id)
        // console.log('>> check data delete',data)
        if(data.EC === 0) {
            toast.success(data.EM)
            fetchApi()
            handleClose()
        }else{
            toast.error(data.EM)
        }
    }

    const handleAddUser = () => {
        setModalDataEdit({})
        setHandleShowModle(true)
        setAction('Create')
    }

    const handleShowEdit = () => {
        setHandleShowModle(true)
        setAction('Update')
    }

    const handleEditUser = (user) => {
        handleShowEdit()
        // console.log('edit')
        setModalDataEdit(user)
        console.log('init data user ',user)
    }

    TestToken()
    return ( 
        <>
            <div className="container">
                <div className="wrapper-user-managent d-flex align-items-center justify-content-between">
                    <h1>Users Page</h1>
                    <div className="div-btn">
                        <button 
                            className="btn btn-success btn-sm mx-2"
                            // onClick={handleRefresh}
                        >
                            <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                            </svg>
                            </span>
                            Refresh
                        </button>
                        <button className="btn btn-primary btn-sm" onClick={handleAddUser}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </span>
                            Add User
                        </button>
                    </div>
                </div>
                <table className="table table-light table-bordered table-sm mt-2">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">User name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Group</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>     
                        {listUser && listUser.length > 0 ?
                            <>
                                {listUser.map((data,index) => {
                                    return( 
                                        <tr key={`row-${index}`}>
                                            <th scope="row">{(currentPage - 1) * currentLimit + index + 1}</th>
                                            <td>{data.username}</td>
                                            <td>{data.email}</td>
                                            <td>{data.Group ? data.Group.name : ''}</td>
                                            <td>
                                                <div className={cx('div-handle-btn','d-flex',)}>
                                                    <button className="btn btn-outline-warning btn-sm mx-2" onClick={() => handleEditUser(data)} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                        </svg>
                                                        Edit
                                                    </button>
                                                    <button 
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleDelete(data)}
                                                    >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                                    </svg>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
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

            <ModalDelete  
                show={show}
                handleClose={handleClose}
                modalData = {modalData}
                confirmDeleteData = {confirmDeleteData}
            />

            <ModalCreate 
                action = {action}
                handleShowModle = {handleShowModle}
                handleClose = {handleClose}
                modalDataEdit = {modalDataEdit}
            />
        </>

    );
}

export default Users;