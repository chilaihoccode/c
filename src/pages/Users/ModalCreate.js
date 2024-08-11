import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState,useEffect } from 'react';
import {toast} from 'react-toastify'

import * as groupService from '~/apiServices/groupService'

function ModalCreate(props) {
      //State Register 
      const [username,setUsename] = useState('')
      const [email,setEmail] = useState('')
      const [phone,setPhone] = useState('')
      const [password,setPassword] = useState('')
      const [gender,setGender] = useState('')
      const [group,setGroup] = useState('')


    const [dataGroup,setDataGroup] = useState({})

    useEffect(() => {
        fetchDataGroup()
    },[])

    const fetchDataGroup = async () => {
        const data = await groupService.getAllGroup()
        // console.log(data)
        if(data && data.DT && data.EC === 0) {
            setDataGroup(data.DT)
        }else {
            toast.error(data.EM)
        }
    }

    return ( 
        <>
            <Modal show={true} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 col-sm-6'>
                                <label>Email (<span className='text-danger'>*</span>) </label>
                                <input 
                                className='form-control'
                                    type='text'
                                />
                            </div>
                            <div className='col-12 col-sm-6'>
                                <label>User name</label>
                                <input 
                                className='form-control'
                                    type='text'
                                />
                            </div>
                            <div className='col-12 col-sm-6'>
                                <label>Password (<span className='text-danger'>*</span>)</label>
                                <input 
                                className='form-control'
                                    type='text'
                                />
                            </div>
                            <div className='col-12 col-sm-6'>
                                <label>Phone (<span className='text-danger'>*</span>)</label>
                                <input 
                                className='form-control'
                                    type='text'
                                />
                            </div>
                            <div className='col-12 col-sm-6'>
                                <label>Gender</label>
                                <select className="form-select">
                                    <option defaultValue>Open this select menu</option>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                    <option value="3">Others</option>
                                </select>
                            </div>
                            <div className='col-12 col-sm-6'>
                                <label>Group : </label>
                                <select className="form-select">
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
                <Button variant="secondary">
                    Close
                </Button>
                <Button variant="primary" >
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}

export default ModalCreate;