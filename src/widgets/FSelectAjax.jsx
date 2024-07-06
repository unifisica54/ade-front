import React, { Component, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Badge,Form, Dropdown, ListGroup, Accordion, InputGroup, Card, Button,Stack } from 'react-bootstrap';
import axiosInstance from '../interceptors/axiosConfig';

class FSelectAjax extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: '1',
            basetUri: props.basetUri,
            endUri: '/index',
            to: 0,
            total: 0,
            size: 0,
            data: [],
            pagination: [],
            form: false,
            disable: false,
            item: props.item,
            clone: this.clone(props.item),
            input: {
                buscar: ''
            },
            buscar: {
                size: '1000',
                search: ''
            }
        };
    }

    componentDidMount() {
        this.load();
        const elements = document.getElementsByName(this.props.buscar_name);
        elements.forEach(element => {
            element.addEventListener('focusout', () =>
                setTimeout(() => {
                    this.setState({ show: '1' })
                }, 200));
            element.addEventListener('focus', () => this.setState(() =>
                setTimeout(() => {
                    this.setState({ show: '0' })
                }, 200)));
        });
    }

    componentWillUnmount() {
        const elements = document.getElementsByName(this.props.buscar_name);
        elements.forEach(element => {
            element.addEventListener('focusout', () => this.setState(() =>
                setTimeout(() => {
                    this.setState({ show: '1' })
                }, 200)));
            element.addEventListener('focus', () => this.setState(() =>
                setTimeout(() => {
                    this.setState({ show: '0' })
                }, 200)));
        });
    }

    componentDidUpdate(prevProps, prevState) {


        const { modal_event } = this.props;
        if (modal_event != prevProps.modal_event) {

            if (modal_event == '') {
                this.close();
            }
        }
        if (prevProps.value !== this.props.value && this.state.data.length > 0) {
            if (this.props.value == 0) {
                this.select(this.props.value, '');
            }
            const matchedItem = this.state.data.find(o => o[this.props.colum[0]] === this.props.value);
            if (matchedItem) {
                this.select(matchedItem[this.props.colum[0]], matchedItem[this.props.colum[1]]);

            }
        }
    }

    changed = (e, callback = null) => {
        const { name, value } = e.target;
        this.setState({
            input: {
                ...this.state.input,
                buscar: value
            }
        }, callback);
    };

    buscar = () => {
        this.setState({
            show: '0',
            buscar: {
                //[this.props.buscar_columna]: this.state.input.buscar,
                search:this.state.input.buscar,
                size: this.state.buscar.size
            }
        }, this.load);
    };

    load = () => {
        axiosInstance.post(this.state.basetUri + this.state.endUri, this.state.buscar)
            .then((response) => {
                this.setState({
                    data: response.data.data.data,
                    pagination: response.data.data.links,
                    to: response.data.data.from,
                    total: response.data.data.total,
                    size: response.data.data.per_page
                });
            })
            .catch((error) => {
                console.error('error:', error);
            });
    }

    clone = (object) => {
        return { ...object };
    }

    show = () => {
        this.setState({
            form: true,
        });
        if (this.props.onForm) {
            this.props.onForm({}, 0);
        }

    }

    close = () => {
        this.setState({
            form: false,

        });
        if (this.props.onForm) {
            this.props.onForm({}, 1);
        }
    }

    edited = (id) => {
        id = id || 0;
        if (id !== 0) {
            axiosInstance.get(`${this.state.basetUri}/edit/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                            form: true,
                            disable: false
                        });
                        if (this.props.onForm) {
                            let json = response.data.data;
                            json.disabled = false;
                            this.props.onForm(response.data.data, 0);
                        }
                    }
                })
                .catch((error) => {
                    console.error('error:', error);
                });
        }
    }

    deleted = (id) => {
        id = id || 0;
        if (id !== 0) {
            axiosInstance.get(`${this.state.basetUri}/delete/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        this.load();
                        this.close();
                    }
                })
                .catch((error) => {
                    console.error('error:', error);
                });
        }
    }


    added = () => {
        this.setState({
            form: true,

        });
        if (this.props.onForm) {
            this.props.onForm({}, 0);
        }
    }

    save = (e) => {
        e.preventDefault();
        const uri = (this.props.item.id === undefined || this.props.item.id ==0)
            ? `${this.state.basetUri}/store`
            : `${this.state.basetUri}/update/${this.props.item.id}`;
        axiosInstance.post(uri, this.props.item)
            .then((response) => {
                if (response.status === 200) {
                    this.load();
                    this.close();
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    if (this.props.onRequest) {
                        this.props.onRequest(error.response.data.errors);
                    }
                } else {
                    console.error('An error occurred:', error);
                }
            });
    }
    showed = (id) => {
        id = id || 0;
        if (id !== 0) {
            axiosInstance.get(`${this.state.basetUri}/edit/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                            form: true,
                            disable: true
                        });
                        if (this.props.onForm) {
                            let json = response.data.data;
                            json.disabled = true;
                            json.btn = 0;
                            this.props.onForm(response.data.data, 0);
                        }
                    }
                })
                .catch((error) => {
                    console.error('error:', error);
                });
        }
    }
    select = (id, buscar) => {
        this.setState({
            item: {
                id: id
            },
            input: {
                buscar: buscar
            }
        });
        if (this.props.onChange) {
            this.props.onChange(id);
        }
    }

    render() {

        const { show, data, input, item, form, disable } = this.state;
        const { label, disabled, event, colum, value, children, buscar_name, validate } = this.props;
 
        return (
            <>
                <Form.Group className="mb-3" >
                    <Form.Label>{label}</Form.Label>
                    {
                        <>
                            <div style={{ display: `${!form ? 'block' : 'none'}` }}>
                                <InputGroup  >
                                    <Form.Control
                                        type='text'
                                        value={input.buscar}
                                        id='buscar'
                                        name={buscar_name}
                                        onChange={this.changed}
                                        placeholder='-- buscar --'
                                        disabled={disabled}
                                        isValid={validate?.length == 0?true:validate==undefined }
                                        isInvalid={validate?.length > 0?true:validate!=undefined}  
                                    //onClick={() => this.setState({ show: show === '1' ? '0' : '1' })}
                                    />
                                    <Dropdown >
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Opción
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={this.buscar} href="#">Buscar</Dropdown.Item>
                                            {event.includes('add') && (
                                                <Dropdown.Item onClick={this.added} href="#">Agregar</Dropdown.Item>
                                            )}
                                            {event.includes('edit') && (
                                                <Dropdown.Item onClick={() => this.edited(item.id)} href="#">Editar</Dropdown.Item>
                                            )}
                                            {event.includes('delete') && (
                                                <Dropdown.Item onClick={() => this.deleted(item.id)} href="#">Eliminar</Dropdown.Item>
                                            )}
                                            {event.includes('show') && (
                                                <Dropdown.Item onClick={() => this.showed(item.id)} href="#">Mostrar</Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </InputGroup>
                                
                                <Accordion defaultActiveKey="0" flush>
                                    <Accordion.Item eventKey={show} >
                                        <Accordion.Body className='my-1 p-0'>
                                            <ListGroup style={{ height: `${data.length > 5 ? 5 * 40 : data.length * 40}px`, overflowY: 'scroll' }}>
                                                {data.map((o) => (
                                                    <ListGroup.Item
                                                        key={o[colum[0]]}
                                                        onClick={() => this.select(o[colum[0]], o[colum[1]])}
                                                        action
                                                        href={'#' + o[colum[0]]}
                                                        variant="light"
                                                        className={o[colum[0]] === value ? 'active' : ''}
                                                    >
                                                        {colum.length > 2
                                                            ? `${o[colum[1]]} | ${o[colum[2]]}`
                                                            : o[colum[1]]}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            </div>
                           
                            {validate?.map((o)=><Badge pill bg="danger"> {o}</Badge>)}
                            
                            <Card style={{ display: `${form ? 'block' : 'none'}` }}>
                                <Card.Body>
                                    {children}
                                    {!disable && (<Button variant="outline-success" onClick={this.save} className=''><i className="bi bi-floppy-fill"></i></Button>)}
                                    <Button variant="outline-danger" onClick={this.close}><i className="bi bi-x-lg"></i></Button>
                                </Card.Body>
                            </Card></>
                    }
                </Form.Group>
            </>
        );
    }
}

FSelectAjax.propTypes = {
    children: PropTypes.node,
    item: PropTypes.object,
    buscar_columna: PropTypes.string.isRequired,
    buscar_name: PropTypes.string.isRequired,
    event: PropTypes.array.isRequired,
    colum: PropTypes.array.isRequired,
    basetUri: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onForm: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    modal_event: PropTypes.string,
    validate   : PropTypes.object,
    onRequest: PropTypes.func,
};

export default FSelectAjax;
