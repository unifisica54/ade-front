import PropTypes from 'prop-types';
import {  Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import axiosInstance from '../interceptors/axiosConfig';

function W(props) {
    function logout(){
        axiosInstance.post('/logout')
        .then((response) => {
            if(response.status==200){
                localStorage.removeItem('token');
                window.location.href = '/'; // Redirect to home page
              }
        })
        .catch((error) => {
            console.error('error:', error);
        });
    }

    return (
        <>
            <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand >{props.children}</Navbar.Brand>
                        <Navbar.Toggle />
                        <Dropdown>
                        
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                <i className='bi bi-person'></i> <span className='ms-2 d-none d-sm-inline'>{props.user.name}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>logout()} >Cerrar Sesion</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                </Navbar>
        </>
    )
}

W.prototype = {
    user: PropTypes.object,
    children : PropTypes.node,
}
export default W;