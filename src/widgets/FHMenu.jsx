import React from 'react';

import { Button } from 'react-bootstrap';
import FMenu from '../widgets/FMenu';
import FHeader from '../widgets/FHeader';

import axiosInstance from '../interceptors/axiosConfig';
import PropTypes from 'prop-types';

class FHMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: this.ListMenu(),
            sidebar: true,
            user: {
                name: '',
                corre: ''
            },
            compony: 'CHKENET'
        };

        this.load();
        if (localStorage.getItem('token') == null) {
            window.location.href = '/';
        }

    }
    
    load = () => {

        axiosInstance.get('/user_details')
            .then((response) => {

                this.setState({
                    user: {
                        name: response.data.user.name,
                        email: response.data.user.email,
                    }
                });
            })
            .catch((error) => {
                console.error('error:', error);
            });
    }

    ListMenu = () => {
        let ArrayMenu = [
            {
                uri: '/inicio',
                name: 'Dashboard',
                icon: 'bi-speedometer2',
                active: false
            },
            {
                uri: '/casos_equipo',
                name: 'Casos Equipos',
                icon: 'bi-cast',
                active: false
            },
            ,
            {
                uri: '/numero_orden',
                name: 'Numero de orden',
                icon: 'bi-clipboard',
                active: false
            },
            {
                uri: '/equipo',
                name: 'Equipos',
                icon: 'bi-pc-display-horizontal',
                active: false
            },
            {
                uri: '/guia_devolucion',
                name: 'Guia de devolucion',
                icon: 'bi-clipboard-x-fill',
                active: false
            },
            {
                uri: '/refaccion',
                name: 'Refaccion',
                icon: 'bi-clipboard2-fill',
                active: false
            },
            {
                uri: '/accion',
                name: 'Accion',
                icon: 'bi-clipboard2-fill',
                active: false
            },
            {
                uri: '/hora_extra',
                name: 'Horas extras',
                icon: 'bi-clipboard2-fill',
                active: false
            }/*,
            {
                uri: '/empleados',
                name: 'Empleados',
                icon: 'bi-person-lines-fill',
                active: false
            }*/,
            {
                uri: '/clientes',
                name: 'Clientes',
                icon: 'bi-person-rolodex',
                active: false
            },
            {
                uri: '/usuarios',
                name: 'Usuarios',
                icon: 'bi-person-fill-gear',
                active: false
            }
        ]

        ArrayMenu.map((menu) => { let uri = window.location.href; if (menu.uri == (uri == null ? null : '/' + uri.split('/')[uri.split('/').length - 1])) menu.active = true });
        return ArrayMenu
    };
    changeNav = (x) => {
        this.setState({
            sidebar: !x,
        });
    };

    render() {
        const { sidebar, menu, user, compony } = this.state;
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className={`bg-dark col-auto min-vh-100 d-flex justify-content-between flex-column` + (sidebar ? ` col-lg-2 col-2` : ` col-lg-1 col-2`)}>
                            <div className='mt-3'>
                                <a className="text-decoration-none text-white d-non d-sm-inline d-flex align-itemcenter ms-3 mt-2">
                                    <span className='ms-1 fs-4 d-none d-sm-inline'>{sidebar ? compony : ``}</span>
                                </a>
                                <hr className='text-secondary d-none d-sm-inline m-2' />
                                <FMenu sidebar={sidebar} menu={menu} />
                            </div>
                        </div>
                        <div className={(sidebar ? ` col-lg-10 col-10` : ` col-lg-11 col-10`) + ` p-0`}>
                            <FHeader user={user} >
                                <Button variant=" border border-dark d-none d-sm-inline outline-dark align-itemcenter " onClick={() => this.changeNav(sidebar)}>
                                    <i class={`bi ` + (sidebar ? `bi-layout-sidebar-inset-reverse` : `bi-layout-sidebar-inset`)}></i>
                                </Button>
                            </FHeader>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

FHMenu.propTypes = {
    children: PropTypes.node
};
export default FHMenu;