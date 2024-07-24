import classNames from 'classnames/bind';
import { useState,useEffect } from 'react'
import axios from 'axios';

import validateForm from '~/services/validateForm';

import styles from './login.module.scss'

const cx = classNames.bind(styles)

function Login() {
    
    const [username,setUsename] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')


    useEffect(() => {
        fetch('http://127.0.0.1:3000/api/v1/get')
        .then(data => data.json())
        .then(res => console.log(res) )
    },[])

  

        const handleRegister = async () => {
            const data = {username,phone,email,password,confirmPassword}
            validateForm(data)
            // console.log('>> Check validate form',validateForm(data))
       
        }


    return ( 
        <div className={cx('wrapper','d-flex','flex-column','justify-content-center')}>
            <div className="container">
                <div className="row d-flex justify-content-space-around">
                    <div className='col-7 d-none d-sm-block'>
                            <h4 className='text-primary text-center'>facebook</h4>
                            <h3 className='text-center'>Dang nhap gan day</h3>
                            <span className='text-center'>Nhap vao anh cua ban hoac them tai khoan</span>
                    </div>
                    <div className="col-12 col-sm-5">
                        <div className={cx('container-form-login',"d-flex",'flex-column','gap-2')}>
                        <h4 className='text-primary d-block d-sm-none'>facebook</h4>
                            <input
                                type='text' 
                                className='form-control' 
                                placeholder='Email hoac so dien thoai'
                             />
                            <input type='password' className='form-control' placeholder='Mau khau' />
                            <button className='btn btn-primary'>Dang nhap</button>
                            <span className='text-center'><a href='#' className={cx('forget-text')}>Quen mat khau</a></span>
                            <hr></hr>
                            <div className='text-center'>
                                <button type='button' className='btn btn-success' data-bs-toggle="modal" data-bs-target="#registerModal">Tao tai khoan moi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* modal Register */}
            <div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm modal-dialog-centered">
                    <div className={cx("modal-content",'container-modal-content')}>
                    <div className="modal-header px-3 py-2">
                        <div className='d-flex flex-column'>
                            <h1 className="modal-title fs-5" id="registerModalLabel">Dang Ki</h1>
                            <span className={cx('detail-title')} >Nhanh chong va de dang</span>
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body px-3 py-1">
                        <form >
                            <div className='row'>
                                <div className="col-12 col-sm-6">
                                    <label htmlFor="username" className="col-form-label">username</label>
                                    <input 
                                        value={username}
                                        type="text" 
                                        className="form-control" 
                                        id="username" 
                                        placeholder='username' 
                                        onChange={e => setUsename(e.target.value)}
                                    />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <label htmlFor="phone" className="col-form-label">Phone munber</label>
                                    <input 
                                        value={phone}
                                        type="munber" 
                                        className="form-control" 
                                        id="phone" 
                                        placeholder='phone' 
                                        onChange={e => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="">
                                    <label htmlFor="email" className="col-form-label">Email adress</label>
                                    <input 
                                        value={email}
                                        type="email" 
                                        className="form-control" 
                                        id="email" 
                                        placeholder='email-adress' 
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            <div className="">
                                <label htmlFor="password" className="col-form-label">Password</label>
                                <input 
                                    value={password}
                                    type="password" 
                                    className="form-control"
                                    id="password" 
                                    placeholder='password' 
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <label htmlFor="comfirm-password" className="col-form-label">Confirm password</label>
                                <input 
                                    value={confirmPassword}
                                    type='password' 
                                    className='form-control' 
                                    id='comfirm-password' 
                                    placeholder='comfirm-password' 
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button 
                            type="button" 
                            className="btn btn-success"
                            onClick={handleRegister}
                        >Dang Ki
                        </button>
                    </div>
                    </div>
                </div>
            </div>

        </div>
     );
}

export default Login;