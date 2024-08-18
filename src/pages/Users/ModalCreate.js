import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState,useEffect } from 'react';
import {toast} from 'react-toastify'
import _ from 'lodash'
import validateFrom from '~/services/validateForm';
// import validateFromCreate from '~/services/validateFromCreate';
import classNames from 'classnames/bind';


import style from './user.module.scss'
import * as groupService from '~/apiServices/groupService'
import * as apiService from '~/apiServices/userService'


const cx = classNames.bind(style)

function ModalCreate(props) {
    const {action,modalDataEdit} = props

    const defaultUserData = {
        email : '',
        username : '',
        password : '',
        phone : '',
        gender : '',
        groupID : ''
    }

    const defaultValid = {
        email : true,
        username : true,
        password : true,
        phone : true,
        gender : true,
        groupID : true
    }
    const [userData,setUserData] = useState(defaultUserData)
    const [dataGroup,setDataGroup] = useState({})
    const [inputVaild,setInputVaild] = useState(defaultValid)
    const [ typePass,setTypePass ] = useState('password')

    
    useEffect(() => {
        fetchDataGroup()
    },[])

    useEffect(() => {
        setUserData(defaultUserData)
        if(action !== 'Create') {
            //console.log('action',action)
            setUserData({...modalDataEdit, groupID : modalDataEdit.Group ? modalDataEdit.Group.id : '', gender : modalDataEdit.gender ? modalDataEdit.gender : 'male'})
            //console.log('>> check prop data edit :',props.modalDataEdit)
        }
    },[modalDataEdit])
    
    const fetchDataGroup = async () => {
        const data = await groupService.getAllGroup()
        // console.log(data)
        if(data && data.DT && data.EC === 0) {
            setDataGroup(data.DT)
        }else {
            toast.error(data.EM)
        }
    }
    
    const handleInputValue = (value,name) => {
        let _userData = _.cloneDeep(userData)
        _userData[name] = value
        setUserData(_userData)
    }   


    const checkValidInput = () => {
        const data = ['email','username','password','phone','gender','groupID',]
        setInputVaild(defaultValid)
        for(let i = 0; i < data.length; i++) {
            // console.log('check data[i]',[data[i]])
            let name = data[i]
            if(!userData[data[i]]) {
                let _inputValid = _.cloneDeep(defaultValid)
                _inputValid[name] = false
                setInputVaild(_inputValid)
                break
            }
        }
    }
    
    const handleConfirmSubmit = async () => {
        let isCheck = validateFrom(userData)
        checkValidInput()
        if(isCheck) {
            let response = action === 'Create' ? await apiService.createUser(userData) : await apiService.updateUser(userData)
            
            if(+response.EC != 0) {
                toast.error(response.EM)
            }
            
            toast.success(response.EM)
            props.handleClose(true)
            setUserData(defaultUserData)
            // console.log('check response :',response)
        }
    }


    const handleChangeTypeInp = () => {
        setTypePass(typePass == 'password' ? 'text' : 'password')
    }   

    const handleCloseModal = () => {
        props.handleClose()
        setUserData(defaultUserData)
    }

    return ( 
        <>
            <Modal show={props.handleShowModle} onHide={handleCloseModal} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>{props.action == 'Create' ? 'Create new user' : 'Edit a user'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 col-sm-6'>
                                <label>Email (<span className='text-danger'>*</span>) </label>
                                <input 
                                    className={inputVaild.email ? 'form-control' : 'form-control is-invalid'}
                                    type='text'
                                    value={userData.email}
                                    onChange={(e) => handleInputValue(e.target.value,'email')}
                                />
                            </div>
                            <div className='col-12 col-sm-6'>
                                <label>User name</label>
                                <input 
                                    className={inputVaild.username ? 'form-control' : 'form-control is-invalid'}
                                    type='text'
                                    value={userData.username}
                                    onChange={(e) => handleInputValue(e.target.value,'username')}
                                />
                            </div>
                            <div className='col-12 col-sm-6'>
                                <label>Phone (<span className='text-danger'>*</span>)</label>
                                <input 
                                    className={inputVaild.phone ? 'form-control' : 'form-control is-invalid'}
                                    type='text'
                                    value={userData.phone}
                                    onChange={(e) => handleInputValue(e.target.value,'phone')}
                                />
                            </div>
                            <div className='col-12 col-sm-6'>
                                {
                                    action === 'Create' && 
                                <>
                                    <label>Password (<span className='text-danger'>*</span>)</label>
                                    <div 
                                    className={inputVaild.password ? 'form-control d-flex justify-content-end' : 'form-control is-invalid'} 
                                        >
                                        <input 
                                            disabled = {action === 'Create' ? false : true}
                                            type={typePass}
                                            className={cx('inputPass')}
                                            value={userData.password}
                                            onChange={(e) => handleInputValue(e.target.value,'password')}
                                            />              
                                        <span 
                                            className={cx('eye-icon')}
                                            onClick={handleChangeTypeInp}    
                                            >
                                            {typePass === 'password' ? 
                                                <>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                                </svg>
                                                </> 
                                                :
                                                <>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                                                </svg>
                                                </>
                                            }
                                        </span>
                                    </div>
                                </>
                            }
                                                   
                            </div>
                            <div className='col-12 col-sm-6'>
                                <label>Gender</label>
                                <select className={inputVaild.gender ? "form-select" : "form-select is-invalid" }
                                    value={userData.gender}
                                    onChange={(e) => handleInputValue(e.target.value,'gender')}    
                                >
                                    <option defaultValue>Open this select menu</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                            <div className='col-12 col-sm-6'>
                                <label>Group : </label>
                                <select className={inputVaild.groupID ? "form-select" : "form-select is-invalid" }
                                    value={userData.groupID}
                                    onChange={(e) => handleInputValue(e.target.value,'groupID')}
                                >
                                    <option defaultValue>Open this select menu</option>
                                    {dataGroup.length > 0 &&
                                        dataGroup.map((item,index) => {
                                            return (
                                                <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleConfirmSubmit} >
                    {action === 'Create' ? 'Save Change' : 'Update '}
                </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}

export default ModalCreate;