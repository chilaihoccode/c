import classNames from 'classnames/bind';

import styles from './login.module.scss'

const cx = classNames.bind(styles)

function Login() {
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
                            <input type='text' className='form-control' placeholder='Email hoac so dien thoai'/>
                            <input type='password' className='form-control' placeholder='Mau khau' />
                            <button className='btn btn-primary'>Dang nhap</button>
                            <span className={cx('text-center','forget-text')}><a href='#'>Quen mat khau</a></span>
                            <hr></hr>
                            <div className='text-center'>
                                <button className='btn btn-success'>Tao tai khoan moi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Login;